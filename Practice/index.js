import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { joke: null, setup: null, delivery: null, error: null });
});

app.post("/", async (req, res) => {
    let category = req.body.category || [];
    let type = req.body.type || "";
    let flags = req.body.blacklistFlags || [];
    try {
        let string1 = type.length ? "type=" + type.toString() : "";
        let string2 = flags.length ? "blacklistFlags=" + flags.toString() : "";
        let string3 = category.length ? "category=" + category.toString() : "";
        let queryParams = [string1, string2, string3].filter(Boolean).join("&");
        let string4 = "https://v2.jokeapi.dev/joke/Any" + (queryParams ? "?" + queryParams : "");
        console.log("Fetching:", string4); // Debug
        const result = await axios.get(string4);
        let jokeData = {};
        if (result.data.type === "single") {
            jokeData = { joke: result.data.joke, setup: null, delivery: null, error: null };
        } else if (result.data.type === "twopart") {
            jokeData = { joke: null, setup: result.data.setup, delivery: result.data.delivery, error: null };
        }
        res.render("index.ejs", jokeData);
    } catch (error) {
        res.render("index.ejs", { joke: null, setup: null, delivery: null, error: "Error fetching joke" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
