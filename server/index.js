const express = require("express");
const https = require("https");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());
console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    api_key: process.env.OPENAI_API_KEY
});

const PORT = 8000;

app.use("/", express.static(path.join(__dirname, "public")));

app.get('/articles', async (req, res) => {
    try {
        const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/');
        const data = await response.json();
        res.json(data.results);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Error fetching articles');
    }
});

app.get("/api/", (req, res) => {
    res
        .status(301)
        .send("Welcome to NASA News.");
});

app.post("/ask", async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": "You are a news summarizer AI which generates all news summaries within 50 words." }, { "role": "user", "content": prompt }],
            model: "gpt-3.5-turbo",
        });
        return res.status(200).json({
            success: true,
            message: completion.choices[0].message.content,
        });
    } catch (error) {
        console.log(error.message);
    }
});





app.listen(PORT, () => {
    console.log("Server running at port number 8000");
})