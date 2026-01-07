import type {RecipeItem} from "../../components/RecipeItem/RecipeItem.ts";

import styles from "./Recipes.module.scss"
import {Link} from "react-router-dom";

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
            <ol className={styles.recipes}>
                {recipes.map((recipe, index) => (
                    <li key={index} className={styles.recipeItem}>
                        <h2>{recipe.iconEmoji} {recipe.name}</h2>
                        <Link to={`/recipes/aa`} className={styles.viewRecipe}>→</Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}