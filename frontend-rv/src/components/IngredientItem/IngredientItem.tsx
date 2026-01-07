import styles from "./IngredientItem.module.scss"

type IngredientItemProps = {
    index: number;
    name: string;
    quantity: string;
    unit: string;
    notes?: string;
}

export default function IngredientItem(props: IngredientItemProps) {
    const {index, name, quantity, unit, notes} = props;
    return (
        <ol className={styles.recipes}>
            <li key={index} className={styles.recipeItem}>
                <h2>{index}. {name}</h2>
                <div className={styles.foodButtons}>
                    <p className={styles.viewIngredient}>{quantity}</p>
                    <p className={styles.viewRecipe}>{unit}</p>
                    {notes && <p className={styles.viewRecipe}>Notes: {notes}</p>}
                </div>
            </li>
        </ol>
    )
}
