import type {RecipeItem} from "../../components/RecipeItem/RecipeItem.ts";

export default function Recipes() {
    const recipes: RecipeItem[] = [
        {
            name: "Spaghetti Bolognese",
            instructions: "1. Cook spaghetti. 2. Prepare Bolognese sauce. 3. Combine and serve.",
            iconEmoji: "🍝"
        },
        {
            name: "Chicken Curry",
            instructions: "1. Cook chicken. 2. Prepare curry sauce. 3. Combine and serve with rice.",
            iconEmoji: "🍛"
        }
    ]
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe, index) => (
                    <li key={index}>
                        <h2>{recipe.iconEmoji} {recipe.name}</h2>
                        <p>{recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}