import {FormEvent, useMemo, useState} from "react";
import styles from "./NewRecipe.module.scss";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";
import {useNavigate} from "react-router-dom";

export default function NewRecipe() {
    const [name, setName] = useState("");
    const [instructionsText, setInstructionsText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successId, setSuccessId] = useState<number | null>(null);
    const navigate = useNavigate();

    const instructions = useMemo(() => {
        return instructionsText
            .split(/\r?\n+/)
            .map(s => s.trim())
            .filter(Boolean);
    }, [instructionsText]);

    const canSubmit = name.trim().length > 0 && instructions.length > 0 && !submitting;

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:3000/api/recipes/create", {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: name.trim(),
                    instructions,
                    ingredients: [],
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || `Failed to create recipe (status ${res.status})`);
            }

            const data = await res.json();
            const recipeId = data?.recipeId as number | undefined;
            setSuccessId(recipeId ?? null);
            // Navigate to the created recipe after brief delay to show success
            if (recipeId) {
                navigate(`/recipe/${recipeId}`);
            } else {
                navigate("/recipes");
            }
        } catch (err: any) {
            setError(err?.message || "Failed to create recipe");
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

                    <div className={styles.group}>
                        <label className={styles.label} htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            className={styles.textarea}
                            placeholder="Type each step on a new line\nBeat the eggs\nMix with flour\nHeat the pan\n..."
                            rows={10}
                            value={instructionsText}
                            onChange={(e) => setInstructionsText(e.target.value)}
                            required
                        />
                        <div className={styles.hint}>Each line becomes a step. Empty lines are ignored.</div>
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

