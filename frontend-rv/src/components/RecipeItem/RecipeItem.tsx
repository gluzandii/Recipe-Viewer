import {Link} from "react-router-dom";
import styles from "./RecipeItem.module.scss"

type RecipeItemProps = {
    index: number;
    name: string;
    id: number;
    iconEmoji: string;
}

export default function RecipeItem(props: RecipeItemProps) {
    const {name, iconEmoji, index, id} = props;

    const handleDelete = async () => {
        const ok = window.confirm("Delete this recipe? This action cannot be undone.");
        if (!ok) return;
        try {
            const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                window.location.reload();
            } else {
                let data: { error?: string } | undefined;
                try {
                    data = await res.json();
                } catch {
                }
                alert(data?.error || 'Failed to delete recipe');
            }
        } catch {
            alert('Failed to delete recipe');
        }
    };

    return (
        <ol className={styles.recipes}>
            <li key={index} className={styles.recipeItem}>
                <h2>{iconEmoji} {name}</h2>
                <div className={styles.foodButtons}>
                    <Link to={`/ingredients/${id}`} className={styles.viewIngredient}>🥕</Link>
                    <Link to={`/recipe/${id}`} className={styles.viewRecipe}>→</Link>
                    <button type="button" className={styles.deleteRecipe} onClick={handleDelete}>🗑️</button>
                </div>
            </li>
        </ol>
    )
}