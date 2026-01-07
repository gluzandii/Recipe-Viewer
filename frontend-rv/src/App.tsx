import './App.css'
import {Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<div>hi</div>}/>
            <Route path="/test" element={<div>test</div>}/>
            <Route path="*" element={<div>not found</div>}/>
        </Routes>
    );
}

