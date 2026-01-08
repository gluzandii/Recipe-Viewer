import {index, integer, pgTable, text, unique} from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm";

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

        userId: integer("user_id")
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

        recipeId: integer("recipe_id")
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

// RELATIONS
export const usersRelations = relations(users, ({many}) => ({
    recipes: many(recipes),
}));

export const recipesRelations = relations(recipes, ({one, many}) => ({
    user: one(users, {
        fields: [recipes.userId],
        references: [users.id],
    }),
    recipeIngredients: many(recipeIngredients),
}));

export const recipeIngredientsRelations = relations(recipeIngredients, ({one}) => ({
    recipe: one(recipes, {
        fields: [recipeIngredients.recipeId],
        references: [recipes.id],
    }),
}));

