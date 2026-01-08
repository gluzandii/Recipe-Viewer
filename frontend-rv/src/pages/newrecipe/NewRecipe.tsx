import type {FormEvent} from "react";
import {useMemo, useState} from "react";
import styles from "./NewRecipe.module.scss";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";
import {useNavigate} from "react-router-dom";
import type {Ingredient} from "../../library/Ingredient.ts";

export default function NewRecipe() {
    const [name, setName] = useState("");
    const [instructionsText, setInstructionsText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Ingredients state
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const instructions = useMemo(() => {
        return instructionsText
            .split(/\r?\n+/)
            .map(s => s.trim())
            .filter(Boolean);
    }, [instructionsText]);

    // An ingredient row is valid if all required fields are non-empty
    const isIngredientValid = (ing: Ingredient) => !!(ing.name?.trim() && ing.quantity?.trim() && ing.unit?.trim());
    const allIngredientsValid = ingredients.length === 0 || ingredients.every(isIngredientValid);

    const canSubmit = name.trim().length > 0 && instructions.length > 0 && !submitting && allIngredientsValid;

    const addIngredient = () => {
        setIngredients((prev) => [...prev, {name: "", quantity: "", unit: "", notes: "", price: ""}]);
    };

    const removeIngredient = (index: number) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    };

    const updateIngredient = <K extends keyof Ingredient>(index: number, key: K, value: Ingredient[K]) => {
        setIngredients((prev) => prev.map((ing, i) => (i === index ? {...ing, [key]: value} : ing)));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        setError(null);

        try {
            const payload = {
                name: name.trim(),
                instructions,
                // Filter out any completely empty ingredient rows just in case
                ingredients: ingredients.filter((ing) => ing.name?.trim() || ing.quantity?.trim() || ing.unit?.trim()),
            };

            const res = await fetch("http://localhost:3000/api/recipes/create", {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            let data: { error?: string; recipeId?: number } | undefined = undefined;
            try {
                data = await res.json();
            } catch {
                // ignore JSON parse error
            }

            if (!res.ok) {
                setError(data?.error || `Failed to create recipe (status ${res.status})`);
                setSubmitting(false);
                return;
            }

            const recipeId = data?.recipeId;
            if (recipeId) {
                navigate(`/recipe/${recipeId}`);
            } else {
                navigate("/recipes");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to create recipe";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Create New Recipe</h1>

                {error && (
                    <Message variant="error" title="Couldn't create recipe" description={error}/>
                )}

                {submitting && <Loading text="Creating recipe..."/>}

                <form className={styles.form} onSubmit={onSubmit}>
                    {/* Recipe name */}
                    <div className={styles.group}>
                        <label className={styles.label} htmlFor="name">Recipe name</label>
                        <input
                            id="name"
                            className={styles.input}
                            type="text"
                            placeholder="e.g., Classic Pancakes"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Instructions */}
                    <div className={styles.group}>
                        <label className={styles.label} htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            className={styles.textarea}
                            placeholder={"Type each step on a new line\nBeat the eggs\nMix with flour\nHeat the pan\n..."}
                            rows={10}
                            value={instructionsText}
                            onChange={(e) => setInstructionsText(e.target.value)}
                            required
                        />
                        <div className={styles.hint}>Each line becomes a step. Empty lines are ignored.</div>
                    </div>

                    {/* Ingredients */}
                    <div className={styles.group}>
                        <div className={styles.ingredientsHeaderRow}>
                            <label className={styles.label}>Ingredients</label>
                            <button type="button" className={styles.addButton} onClick={addIngredient}>+ Add
                                Ingredient
                            </button>
                        </div>

                        {ingredients.length === 0 && (
                            <div className={styles.hint}>No ingredients added. You can submit without ingredients or add
                                them now.</div>
                        )}

                        <div className={styles.ingredientsList}>
                            {ingredients.map((ing, index) => {
                                const valid = isIngredientValid(ing);
                                return (
                                    <div key={index}
                                         className={`${styles.ingredientRow} ${!valid ? styles.invalidRow : ""}`}>
                                        <div className={styles.rowGrid}>
                                            <input
                                                className={styles.input}
                                                placeholder="Name"
                                                value={ing.name}
                                                onChange={(e) => updateIngredient(index, "name", e.target.value)}
                                                required
                                            />
                                            <input
                                                className={styles.input}
                                                placeholder="Quantity"
                                                value={ing.quantity}
                                                onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                                                required
                                            />
                                            <input
                                                className={styles.input}
                                                placeholder="Unit"
                                                value={ing.unit}
                                                onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                                                required
                                            />
                                            <input
                                                className={styles.input}
                                                placeholder="Notes (optional)"
                                                value={ing.notes ?? ""}
                                                onChange={(e) => updateIngredient(index, "notes", e.target.value)}
                                            />
                                            <input
                                                className={styles.input}
                                                placeholder="Price (optional)"
                                                value={ing.price ?? ""}
                                                onChange={(e) => updateIngredient(index, "price", e.target.value)}
                                            />
                                        </div>
                                        <button type="button" className={styles.removeButton}
                                                onClick={() => removeIngredient(index)}>
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.submit} type="submit" disabled={!canSubmit}>
                            {submitting ? "Submitting..." : "Create Recipe"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
