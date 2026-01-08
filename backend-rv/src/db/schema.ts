import {bigint, index, integer, pgTable, text, unique} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";

// USERS
export const users = pgTable("users", {
    id: integer("id")
        .primaryKey()
        .generatedAlwaysAsIdentity(),

    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
});

// RECIPES
export const recipes = pgTable(
    "recipes",
    {
        id: integer("id")
            .primaryKey()
            .generatedAlwaysAsIdentity(),

        userId: bigint("user_id", {mode: "bigint"})
            .notNull()
            .references(() => users.id, {onDelete: "cascade"}),

        name: text("name").notNull(),

        // TEXT[] NOT NULL DEFAULT '{}'
        instructions: text("instructions")
            .array()
            .notNull()
            .default(sql`'{}'::text[]`),
    },
    (t) => ({
        recipesUserIdIdx: index("recipes_user_id_idx").on(t.userId),
    })
);

// RECIPE_INGREDIENTS
export const recipeIngredients = pgTable(
    "recipe_ingredients",
    {
        id: integer("id")
            .primaryKey()
            .generatedAlwaysAsIdentity(),

        recipeId: bigint("recipe_id", {mode: "bigint"})
            .notNull()
            .references(() => recipes.id, {onDelete: "cascade"}),

        name: text("name").notNull(),
        quantity: text("quantity").notNull(),
        unit: text("unit").notNull(),
        price: text("price"),
        notes: text("notes"),
    },
    (t) => ({
        recipeIngredientsRecipeIdIdx: index("recipe_ingredients_recipe_id_idx").on(
            t.recipeId
        ),

        // ⚠️ This matches your SQL exactly, but it allows ONLY ONE ingredient per recipe.
        // recipeUniquePerRecipe: unique("recipe_ingredients_recipe_id_unique").on(t.recipeId),

        // ✅ More realistic alternative (recommended):
        recipeNameUnique: unique("recipe_ingredients_recipe_id_name_unique").on(
            t.recipeId,
            t.name
        ),
    })
);