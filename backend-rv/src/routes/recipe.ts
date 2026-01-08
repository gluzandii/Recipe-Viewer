import {Router, Router as ExpressRouter} from "express";
import {requireAuth} from "../middleware/auth.js";
import {db} from "../db/index.js";
import {recipeIngredients, recipes} from "../db/schema.js";
import {and, eq} from "drizzle-orm";

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
});

// GET /recipes/:id - Get a specific recipe by ID (only if it belongs to the logged-in user)
recipeRouter.get("/:id", requireAuth, async (req, res) => {
    try {
        const userId = (req as any).userId;
        const recipeId = parseInt(req.params.id || "0", 10);

        if (isNaN(recipeId) || recipeId <= 0) {
            return res.status(400).json({error: "Invalid recipe ID. Recipe not available or an error occurred."});
        }

        // Fetch recipe with user validation
        const recipe = await db.query.recipes.findFirst({
            where: and(eq(recipes.id, recipeId), eq(recipes.userId, userId)),
            with: {
                recipeIngredients: true,
            },
        });

        if (!recipe) {
            return res.status(404).json({error: "Recipe not found"});
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({error: "Failed to fetch recipe"});
    }
});

// GET /recipes - Get all recipes for the currently logged-in user
recipeRouter.get("/", requireAuth, async (req, res) => {
    try {
        const userId = (req as any).userId;

        const userRecipes = await db.query.recipes.findMany({
            where: eq(recipes.userId, userId),
            with: {
                recipeIngredients: true,
            },
        });

        res.status(200).json(userRecipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({error: "Failed to fetch recipes"});
    }
});

// DELETE /recipes/:id - Delete a recipe by ID (only if it belongs to the logged-in user)
recipeRouter.delete("/:id", requireAuth, async (req, res) => {
    try {
        const userId = (req as any).userId;
        const recipeId = parseInt(req.params.id || "0", 10);

        if (isNaN(recipeId) || recipeId <= 0) {
            return res.status(400).json({error: "Invalid recipe ID"});
        }

        // Check if the recipe exists and belongs to the user
        const recipe = await db.query.recipes.findFirst({
            where: and(eq(recipes.id, recipeId), eq(recipes.userId, userId)),
        });

        if (!recipe) {
            return res.status(404).json({error: "Recipe not found"});
        }

        // Delete the recipe (ingredients will be deleted automatically due to CASCADE)
        await db.delete(recipes).where(eq(recipes.id, recipeId));

        res.status(200).json({message: "Recipe deleted successfully"});
    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({error: "Failed to delete recipe"});
    }
});

