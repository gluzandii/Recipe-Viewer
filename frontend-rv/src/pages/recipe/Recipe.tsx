import {Link, useParams} from "react-router-dom";

import styles from "./Recipe.module.scss"
import RecipeStep from "../../components/RecipeStep/RecipeStep.tsx";
import {useEffect, useState} from "react";

export default function Recipe() {
    const {recipeID} = useParams<{ recipeID: string }>();
    const recId = recipeID ? parseInt(recipeID) : -1;
    const [instrs, setInstrs] = useState<string[]>([]); // TODO: Fetch recipes from backend
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch(`http://localhost:3000/api/recipes/${recId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                setMessage("Failed to fetch recipe.");
                setLoading(false);
            }
            const data = await response.json();

            setLoading(false);
            setInstrs(data.instructions);
            setName(data.name);
        };

        fetchRecipes().then();
    }, [recId])

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    } else {
        if (message) {
            return (
                <div>
                    <p>{message}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h1 className={styles.recipe}>{name}</h1>
                    <Link to={`/ingredients/${recipeID}`} className={styles.ingredientButton}>🥕Ingredients</Link>
                    {instrs.map((instruction, index) => (
                        <RecipeStep index={index} instruction={instruction}/>
                    ))}
                </div>
            )
        }
    }
}