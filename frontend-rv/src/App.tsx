// import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Recipes from "./pages/recipes/Recipes.tsx";

export default function App() {
    return (
        <main>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/recipes" element={<Recipes/>}/>
                <Route path="/recipe/:recipeID" element={<div>recipe</div>}/>
                <Route path="/ingredients/:ingredID" element={<div>ingredients</div>}/>
                <Route path="*" element={<div>not found</div>}/>
            </Routes>
        </main>
    );
}

