import {Link, useParams} from "react-router-dom";
import type {Recipe} from "../../library/Recipe.ts";

import styles from "./Recipe.module.scss"
import RecipeStep from "../../components/RecipeStep/RecipeStep.tsx";

export default function Recipe() {
    const {recipeID} = useParams<{ recipeID: string }>();

    const recipe: Recipe = {
        iconEmoji: "🍰",
        name: "Cake",
        hash: recipeID ?? "sample-recipe",
        instructions: [
            "onesdfadsf\ndsfsd",
            "two",
            "three"
        ]
    };
    return (
        <div>
            <h1 className={styles.recipe}>{recipe.iconEmoji} {recipe.name}</h1>
            <Link to={`/ingredients/${recipeID}`} className={styles.ingredientButton}>Ingredients</Link>
            {recipe.instructions.map((instruction, index) => (
                <RecipeStep index={index} instruction={instruction}/>
            ))}
        </div>
    )
}