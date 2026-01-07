import {Link} from "react-router-dom";
import styles from "./RecipeItem.module.scss"

type RecipeItemProps = {
    index: number;
    name: string;
    hash: string;
    instructions: string;
    iconEmoji: string;
}

export default function RecipeItem(props: RecipeItemProps) {
    const {name, iconEmoji, index, hash} = props;
    return (
        <ol className={styles.recipes}>
            <li key={index} className={styles.recipeItem}>
                <h2>{iconEmoji} {name}</h2>
                <div className={styles.foodButtons}>
                    <Link to={`/ingredients/${hash}`} className={styles.viewIngredient}>🥦</Link>
                    <Link to={`/recipe/${hash}`} className={styles.viewRecipe}>→</Link>
                </div>
            </li>
        </ol>
    )
}