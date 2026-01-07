import {useParams} from "react-router-dom";

export default function Ingredients() {
    const {ingredID} = useParams<{ ingredID: string }>()
    return <>{ingredID}</>
}