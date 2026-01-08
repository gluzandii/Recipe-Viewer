// import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Recipes from "./pages/recipes/Recipes.tsx";
import Ingredients from "./pages/ingredients/Ingredients.tsx";
import Recipe from "./pages/recipe/Recipe.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import ProtectedRoute from "./library/ProtectedRoute.tsx";

export default function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/recipes" element={<ProtectedRoute><Recipes/></ProtectedRoute>}/>
                <Route path="/recipe/:recipeID" element={<ProtectedRoute><Recipe/></ProtectedRoute>}/>
                <Route path="/ingredients/:ingredID" element={<ProtectedRoute><Ingredients/></ProtectedRoute>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path="*" element={<div>not found</div>}/>
            </Routes>
        </>
    );
}
