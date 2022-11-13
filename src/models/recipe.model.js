import { model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    name: String,
    description: String,
    thumbsUp: String,
    thumbsDown: String,
  },
  { timestamps: true },
);

const recipe = model('Recipe', recipeSchema);

export default recipe;
