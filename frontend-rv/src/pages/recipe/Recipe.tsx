import {useParams} from "react-router-dom";
import type {Recipe} from "../../library/Recipe.ts";

export default function Recipe() {
    const {recipeID} = useParams<{ recipeID: string }>();

    const recipe: Recipe = {
        iconEmoji: "🍰",
        name: "Sample Recipe",
        hash: recipeID ?? "sample-recipe",
        instructions: "Mix all ingredients and bake for 30 minutes."
    };
    return <div>{recipeID}</div>;
}