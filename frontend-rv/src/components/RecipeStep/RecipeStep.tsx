import styles from "./RecipeStep.module.scss";

type RecipeStepProps = {
    index: number;
    instruction: string;
}

export default function RecipeStep(props: RecipeStepProps) {
    const {index, instruction} = props;

    return (
        <ol className={styles.steps}>
            <li key={index} className={styles.step}>
                <h3>{index + 1}.</h3>
                <p className={styles.text}>{instruction}</p>
            </li>
        </ol>
    );
}