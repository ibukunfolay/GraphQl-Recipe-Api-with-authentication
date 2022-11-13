import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Recipe {
    name: String
    description: String
    createdAt: String
    updatedAt: String
    thumbsUp: String
    thumbsDown: String
  }

  input RecipeInput {
    name: String
    description: String
  }

  type User {
    username: String
    email: String
    token: String
    createdAt: String
    updatedAt: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input EditUserInput {
    username: String
    password: String
  }

  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]

    user(ID: ID!): User!
    getUsers(amount: Int): [User]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput!): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean

    createUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    deleteUser(ID: ID!): Boolean
    editUser(ID: ID!, editUserInput: EditUserInput): Boolean
  }
`;
