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
    return (
        <ol className={styles.recipes}>
            <li key={index} className={styles.recipeItem}>
                <h2>{iconEmoji} {name}</h2>
                <div className={styles.foodButtons}>
                    <Link to={`/ingredients/${id}`} className={styles.viewIngredient}>🥕</Link>
                    <Link to={`/recipe/${id}`} className={styles.viewRecipe}>→</Link>
                </div>
            </li>
        </ol>
    )
}