// RecipeList component
import useRecipeStore  from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, molestias vitae? Consequatur aperiam amet, ab laboriosam quod corrupti quia, alias porro sed, harum eos dolor numquam omnis qui itaque fuga!
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};


export default RecipeList;

