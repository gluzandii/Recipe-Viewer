import {useParams} from "react-router-dom";
import type {Ingredient} from "../../library/Ingredient.ts";
import IngredientItem from "../../components/IngredientItem/IngredientItem.tsx";

export default function Ingredients() {
    const {ingredID} = useParams<{ ingredID: string }>()

    const recipeName = "Chocolate Cake";
    const ingreds: Ingredient[] = [
        {name: "Flour", quantity: "2", unit: "cups"},
        {name: "Sugar", quantity: "1", unit: "cup", price: "$200"},
        {name: "Eggs", quantity: "3", unit: "pieces", notes: "Large", price: "$200"},
    ];
    return (
        <div>
            <h1>Ingredients for {recipeName}</h1>
            {ingreds.map((ingred, index) => (
                <IngredientItem index={index + 1} name={ingred.name} quantity={ingred.quantity} unit={ingred.unit}
                                notes={ingred.notes} price={ingred.price}/>
            ))}
        </div>
    )
}