import type {Recipe} from "../../library/Recipe.ts";
import RecipeItem from "../../components/RecipeItem/RecipeItem.tsx";

export default function Recipes() {
    const recipes: Recipe[] = [
        {
            name: "Spaghetti Bolognese",
            instructions: [
                "1. Cook spaghetti according to package instructions.",
                "2. In a separate pan, sauté onions and garlic.",
                "3. Add ground beef and cook until browned.",
                "4. Stir in tomato sauce and simmer for 20 minutes.",
                "5. Serve sauce over spaghetti and garnish with Parmesan cheese."
            ],
            hash: "spaghetti-bolognese-001",
            iconEmoji: "🍝"
        },
        {
            name: "Chicken Curry",
            instructions: [
                "1. Sauté onions, garlic, and ginger in a pot.",
                "2. Add chicken pieces and cook until browned.",
                "3. Stir in curry powder and cook for 2 minutes.",
                "4. Add coconut milk and simmer until chicken is cooked through.",
                "5. Serve with rice and garnish with fresh cilantro."
            ],
            hash: "chicken-curry-001",
            iconEmoji: "🍛"
        }
    ]
    return (
        <div>
            <h1>Recipes</h1>
            <div>
                {recipes.map((recipe, index) => (
                    <RecipeItem index={index} name={recipe.name}
                                hash={recipe.hash} iconEmoji={recipe.iconEmoji}/>
                ))}
            </div>
        </div>
    );
}