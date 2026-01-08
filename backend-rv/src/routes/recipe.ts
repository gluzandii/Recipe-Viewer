import {Router, Router as ExpressRouter} from "express";
import {requireAuth} from "../middleware/auth.js";
import {db} from "../db/index.js";
import {recipeIngredients, recipes} from "../db/schema.js";

export const recipeRouter: ExpressRouter = Router();

interface IngredientInput {
    name: string;
    quantity: string;
    unit: string;
    price?: string;
    notes?: string;
}

interface CreateRecipeBody {
    name: string;
    instructions: string[];
    ingredients: IngredientInput[];
}

recipeRouter.post("/create", requireAuth, async (req, res) => {
    try {
        const userId = (req as any).userId;
        const {name, instructions, ingredients} = req.body as CreateRecipeBody;

        // Validate required fields
        if (!name || !instructions || !Array.isArray(instructions)) {
            return res.status(400).json({error: "Recipe name and instructions array are required"});
        }

        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({error: "Ingredients array is required"});
        }

        // Create the recipe
        const [recipe] = await db
            .insert(recipes)
            .values({
                userId,
                name,
                instructions,
            })
            .returning();

        if (!recipe) {
            return res.status(500).json({error: "Failed to create recipe"});
        }

        // Create the recipe ingredients if any
        if (ingredients.length > 0) {
            await db.insert(recipeIngredients).values(
                ingredients.map((ingredient) => ({
                    recipeId: recipe.id,
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit,
                    price: ingredient.price || null,
                    notes: ingredient.notes || null,
                }))
            );
        }

        res.status(201).json({
            message: "Recipe created successfully",
            recipeId: recipe.id,
        });
    } catch (error) {
        console.error("Error creating recipe:", error);
        res.status(500).json({error: "Failed to create recipe"});
    }
})
