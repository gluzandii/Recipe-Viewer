import RecipeItem from "../../components/RecipeItem/RecipeItem.tsx";
import {useEffect, useState} from "react";
import type {Recipe} from "../../library/Recipe.ts";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";
import {Link} from "react-router-dom";
import {getFavorites} from "../../library/favorites.ts";

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]); // TODO: Fetch recipes from backend
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [favorites, setFavorites] = useState<Set<number>>(() => getFavorites());

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipes', {
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

    const handleFavoriteToggle = () => {
        // Refresh favorites from localStorage
        setFavorites(getFavorites());
    };

    if (loading) {
        return <Loading text="Loading recipes..."/>;
    } else {
        if (message) {
            return <Message variant="error" title="Couldn't load recipes" description={message}/>;
        } else {
            return (
                <div>
                    <h1 style={{marginLeft: "1%"}}>Recipes</h1>
                    <div style={{display: "flex", justifyContent: "center", margin: "20px 0"}}>
                        <Link to="/newrecipe" style={{textDecoration: "none"}}>
                            <button style={{
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px 24px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                transition: "background-color 0.2s"
                            }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#218838"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#28a745"}
                            >
                                <span style={{fontSize: "20px"}}>👨‍🍳</span>
                                Create New Recipe
                            </button>
                        </Link>
                    </div>
                    {recipes.length === 0 ? (
                        <Message variant="info" title="No recipes yet"
                                 description="Create your first recipe to get started."/>
                    ) : (
                        <div>
                            {recipes.map((recipe, index) => (
                                <RecipeItem
                                    key={recipe.id}
                                    index={index}
                                    name={recipe.name}
                                    id={recipe.id}
                                    iconEmoji={recipe.iconEmoji}
                                    isFavorite={favorites.has(recipe.id)}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )
        }
    }
}