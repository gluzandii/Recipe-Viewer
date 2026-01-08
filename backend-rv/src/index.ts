import {app} from "./app.js";

if (!process.env.RVPORT) {
    console.error("RVPORT not set in environment variables, exiting.");
    process.exit(1);
}

const PORT = Number(process.env.RVPORT);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});