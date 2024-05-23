const axios = require('axios');
const { response } = require('express');
const Anthropic = require("@anthropic-ai/sdk");
const dotenv = require('dotenv');
const apiKey = dotenv.config().parsed.OPENAI_API_KEY;

// TODO implement caching

const fetchMovieData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: 'f8df3e1',
            s: searchTerm,
        }
    });

    console.log(response.data);
    alert('DONE!: ' + response.data.totalResults);
}

const fetchMovies = async (mood) => {

    const anthropic = new Anthropic({
    apiKey: apiKey, // defaults to process.env["ANTHROPIC_API_KEY"]
    });

    const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    temperature: 0,
    system: "I am a movie name generator. Respond ONLY with movie names, that are comma separated.",
    messages: [
        {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": `I'm feeling \"${mood}\". Can you recommend 4 movies for me to watch? `
            }
        ]
        }
    ]
    });
    console.log(msg);

    // TODO fetch movie data

    return response.json({data: "TODO"});
}

module.exports = { fetchMovies };
