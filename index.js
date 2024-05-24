const express = require("express");
const app = express();
const axios = require('axios');
const Anthropic = require("@anthropic-ai/sdk");
const dotenv = require('dotenv');


// ### MIDDLEWARE ###
app.use(express.static("public"));
app.use(express.json());

// ### CONFIGURE ENVIRONMENT ###
dotenv.config();
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const omdbApiKey = process.env.OMDB_API_KEY;

// TODO implement caching

const fetchMovieData = async (searchTerm) => {
    try {
        const response = await axios.get('http://www.omdbapi.com/',{
            params: {
                apikey: omdbApiKey,
                s: searchTerm,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const fetchMovies = async (req, res) => {
    const mood = req.query.mood || req.body.mood;

    if (!mood) {
        res.status(400).json({ error: "No mood provided"});
        return;
    }

    // const anthropic = new Anthropic({
    //     apiKey: anthropicApiKey,
    // });

    // {
    //     id: '',
    //     type: 'message',
    //     role: 'assistant',
    //     model: 'claude-3-opus-20240229',
    //     content: [
    //       {
    //         type: 'text',
    //         text: "Happy Gilmore, The Pursuit of Happyness, Singin' in the Rain, Amelie"
    //       }
    //     ],
    //     stop_reason: 'end_turn',
    //     stop_sequence: null,
    //     usage: { input_tokens: 46, output_tokens: 28 }
    //   }


    //     const msg = await anthropic.messages.create({
    //             model: "claude-3-opus-20240229",
    //             max_tokens: 1000,
    //             temperature: 0,
    //             system: "I am a movie name generator. Respond ONLY with movie names, that are comma separated.",
    //             messages: [
    //                 {
    //                     "role": "user",
    //                     "content": [
    //                         {
    //                             "type": "text",
    //                             "text": `I'm feeling \"${mood}\". Can you recommend 4 movies for me to watch? `
    //                         }
    //                     ]
    //                 }
    //             ]
    //         });
    //     console.log(msg);

    //     const usage = msg.usage || {};
    //     const movies = msg.content[0].text.split(',').map(movie => movie.trim());
       
    try {
        // Mocked movie list, replace with actual API call to Anthropic if needed
        const movies = ['Happy Gilmore', 'The Pursuit of Happyness', 'Singin\' in the Rain', 'Amelie'];
        const movieDetails = [];

        for (const movieTitle of movies) {
            try {
                const movieResponse = await fetchMovieData(movieTitle);
                console.log("movieResponse: ", movieResponse);
                if (movieResponse && movieResponse.Search && movieResponse.Search.length > 0) {
                    movieDetails.push(movieResponse.Search[0]);
                    console.log('Movie found:', movieTitle);
                } else {
                    console.error('No movies found for:', movieTitle);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (movieDetails.length < 1) {
            return res.status(500).json({ error: "Error fetching movie data"});
        }

        const usage = {};
        return res.status(200).json({ data: movieDetails, usage: usage, model: "claude-3-opus-20240229"});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Error fetching movie data"});
    }
}

// ### HANDLE ROUTES ###
// home route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/index.html");
});

// movies route
app.get("/movies", fetchMovies);

// redirect all other routes to the home page
app.get("*", (req, res) => {
    res.redirect("/");
});

// ### START SERVER ###
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


