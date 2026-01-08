import {Link} from "react-router-dom";
import styles from "./RecipeItem.module.scss"
import {toggleFavorite as toggleFavoriteUtil} from "../../library/favorites.ts";

type RecipeItemProps = {
    index: number;
    name: string;
    id: number;
    iconEmoji: string;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
}

export default function RecipeItem(props: RecipeItemProps) {
    const {name, iconEmoji, index, id, isFavorite, onFavoriteToggle} = props;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavoriteUtil(id);
        onFavoriteToggle();
    };

    const handleDelete = async () => {
        const ok = window.confirm("Delete this recipe? This action cannot be undone.");
        if (!ok) return;
        try {
            const res = await fetch(`/api/recipes/${id}`, {
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
                    // Ignore JSON parse errors
                }
                alert(data?.error || 'Failed to delete recipe');
            }
        } catch {
            // Failed to delete recipe - network error
            alert('Failed to delete recipe');
        }
    };

    return (
        <ol className={styles.recipes}>
            <li key={index} className={styles.recipeItem}>
                <h2>{iconEmoji} {name}</h2>
                <div className={styles.foodButtons}>
                    <button
                        type="button"
                        className={`${styles.favoriteRecipe} ${isFavorite ? styles.favorited : ''}`}
                        onClick={handleFavoriteClick}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? '⭐' : '☆'}
                    </button>
                    <Link to={`/ingredients/${id}`} className={styles.viewIngredient}>🥕</Link>
                    <Link to={`/recipe/${id}`} className={styles.viewRecipe}>→</Link>
                    <button type="button" className={styles.deleteRecipe} onClick={handleDelete}>🗑️</button>
                </div>
            </li>
        </ol>
    )
}