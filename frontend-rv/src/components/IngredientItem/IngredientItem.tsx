import styles from "./IngredientItem.module.scss"

type IngredientItemProps = {
    index: number;
    name: string;
    quantity: string;
    unit: string;
    notes?: string;
    price?: string;
}

export default function IngredientItem(props: IngredientItemProps) {
    const {index, name, quantity, unit, notes, price} = props;
    return (
        <ol className={styles.ingredient}>
            <li key={index} className={styles.ingredientItem}>
                <h2>{index}. {name}</h2>
                <div>
                    <p><b><i>Quantity:</i></b> {quantity}</p>
                    <p><b><i>Unit:</i></b> {unit}</p>
                    {notes && <p><b><i>Notes:</i></b> {notes}</p>}
                    {price && <p><b><i>Price:</i></b> {price}</p>}
                </div>
            </li>
        </ol>
    )
}
