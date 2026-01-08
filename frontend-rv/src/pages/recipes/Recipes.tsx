import RecipeItem from "../../components/RecipeItem/RecipeItem.tsx";
import {useEffect, useState} from "react";
import type {Recipe} from "../../library/Recipe.ts";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]); // TODO: Fetch recipes from backend
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('http://localhost:3000/api/recipes', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                setMessage("Failed to fetch recipes.");
                setLoading(false);
            }
            const data = await response.json();
            setLoading(false);
            setRecipes(data);
        };

        fetchRecipes().then();
    }, [])

    if (loading) {
        return <Loading text="Loading recipes..."/>;
    } else {
        if (message) {
            return <Message variant="error" title="Couldn't load recipes" description={message}/>;
        } else {
            return (
                <div>
                    <h1 style={{marginLeft: "1%"}}>Recipes</h1>
                    <div>
                        {recipes.map((recipe, index) => (
                            <RecipeItem index={index} name={recipe.name}
                                        id={recipe.id} iconEmoji={recipe.iconEmoji}/>
                        ))}
                    </div>
                </div>
            )
        }
    }
}