import {Link, useParams} from "react-router-dom";

import styles from "./Recipe.module.scss"
import RecipeStep from "../../components/RecipeStep/RecipeStep.tsx";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";

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
        return <Loading text="Loading recipe..."/>;
    } else {
        if (message) {
            return <Message variant="error" title="Couldn't load recipe" description={message}/>;
        } else {
            return (
                <div>
                    <h1 className={styles.recipe}>{name}</h1>
                    <Link to={`/ingredients/${recipeID}`} className={styles.ingredientButton}>🥕Ingredients</Link>
                    {instrs.length === 0 ? (
                        <Message variant="info" title="No steps yet"
                                 description="This recipe doesn't have any steps. Add some instructions to get started."/>
                    ) : (
                        instrs.map((instruction, index) => (
                            <RecipeStep index={index} instruction={instruction}/>
                        ))
                    )}
                </div>
            )
        }
    }
}