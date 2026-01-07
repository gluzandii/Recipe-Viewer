import {useParams} from "react-router-dom";
import type {Ingredient} from "../../library/Ingredient.ts";

export default function Ingredients() {
    const {ingredID} = useParams<{ ingredID: string }>()

    const recipeName = "Chocolate Cake";
    const ingreds: Ingredient[] = [
        {name: "Flour", quantity: "2", unit: "cups"},
        {name: "Sugar", quantity: "1", unit: "cup"},
        {name: "Eggs", quantity: "3", unit: "pieces", notes: "Large"},
    ];
    return (
        <div>
            <h1>Ingredients for {recipeName}</h1>
        </div>
    )
}