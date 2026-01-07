import type {RecipeItem} from "../../library/RecipeItem.ts";
import RecipeItem from "../../components/RecipeItem/RecipeItem.tsx";

export default function Recipes() {
    const recipes: RecipeItem[] = [
        {
            name: "Spaghetti Bolognese",
            instructions: "1. Cook spaghetti. 2. Prepare Bolognese sauce. 3. Combine and serve.",
            hash: "spaghetti-bolognese-001",
            iconEmoji: "🍝"
        },
        {
            name: "Chicken Curry",
            instructions: "1. Cook chicken. 2. Prepare curry sauce. 3. Combine and serve with rice.",
            hash: "chicken-curry-001",
            iconEmoji: "🍛"
        }
    ]
    return (
        <div>
            <h1>Recipes</h1>
            <div>
                {recipes.map((recipe, index) => (
                    <RecipeItem index={index} name={recipe.name} instructions={recipe.instructions}
                                hash={recipe.hash} iconEmoji={recipe.iconEmoji}/>
                ))}
            </div>
        </div>
    );
}