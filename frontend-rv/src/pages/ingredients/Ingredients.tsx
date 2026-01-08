import {Link, useParams} from "react-router-dom";
import type {Ingredient} from "../../library/Ingredient.ts";
import IngredientItem from "../../components/IngredientItem/IngredientItem.tsx";
import styles from "./Ingredients.module.scss";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";

export default function Ingredients() {
    const {ingredID} = useParams<{ ingredID: string }>()
    const ingredId = ingredID ? parseInt(ingredID) : -1;
    const [ingreds, setIngreds] = useState<Ingredient[]>([]); // TODO: Fetch recipes from backend
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // const ingreds: Ingredient[] = [
    //     {name: "Flour", quantity: "2", unit: "cups"},
    //     {name: "Sugar", quantity: "1", unit: "cup", price: "$200"},
    //     {name: "Eggs", quantity: "3", unit: "pieces", notes: "Large", price: "$200"},
    // ];


    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch(`http://localhost:3000/api/ingredients/${ingredId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                setMessage("Failed to fetch ingredients.");
                setLoading(false);
            }
            const data = await response.json();
            console.log(data);

            setIngreds(data);
            setLoading(false);
        };

        fetchRecipes().then();
    }, [ingredId]);

    if (loading) {
        return <Loading text="Loading ingredients..."/>;
    } else {
        if (message) {
            return <Message variant="error" title="Couldn't load ingredients" description={message}/>;
        } else {
            return (
                <div className={styles.ingredientsPage}>
                    <h1 className={styles.title}>Ingredients</h1>
                    {ingreds.map((ingred, index) => (
                        <IngredientItem index={index + 1} name={ingred.name} quantity={ingred.quantity}
                                        unit={ingred.unit}
                                        notes={ingred.notes} price={ingred.price}/>
                    ))}
                    <Link to={`/recipe/${ingredID}`}>
                        <button className={styles.backButton}>🍽️ Back to Recipe</button>
                    </Link>
                </div>
            )
        }
    }
}