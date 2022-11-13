import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-errors';

import recipe from '../models/recipe.model';
import User from '../models/user.model';

export const resolvers = {
  Query: {
    recipe: async (_, { ID }) => {
      return await recipe.findById(ID);
    },

    getRecipes: async (_, { amount }) => {
      return await recipe.find().sort(-1).limit(amount);
    },

    user: async (_, { ID }) => {
      return await recipe.findById(ID);
    },

    getUsers: async (_, { amount }) => {
      return await recipe.find().sort(-1).limit(amount);
    },
  },

  Mutation: {
    createRecipe: async (_, { recipeInput: { name, description } }) => {
      const newRecipe = new recipe({
        name: name,
        description: description,
        thumbsUp: 0,
        thumbsDown: 0,
      });

      const res = await newRecipe.save();

      return { id: res._id, ...res._doc };
    },

    deleteRecipe: async (_, { ID }) => {
      return (await recipe.deleteOne({ _id: ID })).deletedCount;
    },

    editRecipe: async (_, { ID, recipeInput: { name, description } }) => {
      const res = await recipe.updateOne(
        { _id: ID },
        {
          name: name,
          description: description,
        },
      );

      return res.modifiedCount;
    },

    createUser: async (_, { registerInput: { username, email, password } }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new ApolloError('Email already in use', 'USER_ALREADY_EXISTS');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      const token = jwt.sign({ user_id: newUser._id, email }, 'SAFE_KEY', {
        expiresIn: '10m',
      });

      newUser.token = token;

      const user = await newUser.save();

      return { password: user.password, ...user._doc };
    },

    loginUser: async (_, { loginInput: { email, password } }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new ApolloError('invalid credentials', 'INVALID_CREDENTIALS');
      }

      if (user && (await bcrypt.compareSync(password, user.password))) {
        const token = jwt.sign({ user_id: user._id, email }, 'SAFE_KEY', {
          expiresIn: '10m',
        });

        user.token = token;

        return { password: user.password, ...user._doc };
      }
    },

    deleteUser: async (_, { ID }) => {
      return (await recipe.deleteOne({ _id: ID })).deletedCount;
    },

    editUser: async (_, { ID, recipeInput: { name, description } }) => {
      const res = await recipe.updateOne(
        { _id: ID },
        {
          name: name,
          description: description,
        },
      );

      return res.modifiedCount;
    },
  },
};
