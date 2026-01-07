import {Link, useParams} from "react-router-dom";
import type {Recipe} from "../../library/Recipe.ts";

import styles from "./Recipe.module.scss"

export default function Recipe() {
    const {recipeID} = useParams<{ recipeID: string }>();

    const recipe: Recipe = {
        iconEmoji: "🍰",
        name: "Cake",
        hash: recipeID ?? "sample-recipe",
        instructions: [
            "one",
            "two",
            "three"
        ]
    };
    return (
        <div>
            <h1 className={styles.recipe}>{recipe.iconEmoji} {recipe.name}</h1>
            <Link to={`/ingredients/${recipeID}`} className={styles.ingredientButton}>Ingredients</Link>
        </div>
    )
}