import {Router, Router as ExpressRouter} from "express";
import {requireAuth} from "../middleware/auth.js";
import {db} from "../db/index.js";
import {recipeIngredients, recipes} from "../db/schema.js";
import {and, eq} from "drizzle-orm";

export const ingredientsRouter: ExpressRouter = Router();

// GET /ingredients/:recipeId - Fetch ingredients for a recipe owned by the logged-in user
ingredientsRouter.get("/:recipeId", requireAuth, async (req, res) => {
    try {
        const userId = (req as any).userId;
        const recipeId = parseInt(req.params.recipeId || "0", 10);

        if (Number.isNaN(recipeId) || recipeId <= 0) {
            return res.status(400).json({error: "A valid recipeId path parameter is required"});
        }

        // Ensure the recipe belongs to the current user
        const recipe = await db.query.recipes.findFirst({
            where: and(eq(recipes.id, recipeId), eq(recipes.userId, userId)),
        });

        if (!recipe) {
            return res.status(404).json({error: "Recipe not found"});
        }

        const ingredients = await db.query.recipeIngredients.findMany({
            where: eq(recipeIngredients.recipeId, recipeId),
        });

        return res.status(200).json(ingredients);
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        return res.status(500).json({error: "Failed to fetch ingredients"});
    }
});
