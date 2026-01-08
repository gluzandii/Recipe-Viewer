import {app} from "./app.js";

if (!process.env.RV_BACK) {
    console.error("RV_BACK not set in environment variables, exiting.");
    process.exit(1);
}

const PORT = Number(process.env.RV_BACK);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});