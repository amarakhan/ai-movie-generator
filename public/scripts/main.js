document.addEventListener("DOMContentLoaded", function () {
    const background = document.querySelector(".background");

    function createPopcorn() {
        const popcorn = document.createElement("div");
        popcorn.classList.add("popcorn");
        popcorn.style.left = `${Math.random() * 100}vw`;
        popcorn.style.animationDuration = `${Math.random() * 5 + 5}s`;
        background.appendChild(popcorn);

        setTimeout(() => {
            popcorn.remove();
        }, 10000);
    }

    setInterval(createPopcorn, 500);

    document.getElementById("getMoods").addEventListener("click", displayMoods);
    document.getElementById("backToHome").addEventListener("click", () => {
        displayContainer("moodContainer");
    });

});

const moods = [
    "happy",
    "excited",
    "curious",
    "calm",
    "confident",
    "cheerful",
    "grateful",
    "hopeful",
    "inspired",
    "joyful",
    "optimistic",
    "relaxed",
    "content",
    "compassionate",
    "determined",
    "energized",
    "peaceful",
    "proud",
    "satisfied",
    "amused",
    "blissful",
    "carefree",
    "charmed",
    "delighted",
    "dreamy",
    "ecstatic",
    "elated",
    "enthusiastic",
    "fulfilled",
    "gleeful",
    "harmonious",
    "inquisitive",
    "jubilant",
    "loving",
    "mellow",
    "motivated",
    "overjoyed",
    "playful",
    "radiant",
    "refreshed",
    "serene",
    "spirited",
    "thankful",
    "thrilled",
    "uplifted",
    "vibrant",
    "vivacious",
    "warm",
    "wonderful",
];

const displayMoods = () => {
    console.log("displayMoods");

    // select 6 random moods from moods array
    const selectedMoods = [];
    while (selectedMoods.length < 6) {
        const randomIndex = Math.floor(Math.random() * moods.length);
        const randomMood = moods[randomIndex];
        if (!selectedMoods.includes(randomMood)) {
            selectedMoods.push(randomMood);
        }
    }

    const moodButtons = document.getElementById("moodButtons");
    moodButtons.innerHTML = "";

    selectedMoods.forEach((mood) => {
        // create buttons and append to #moodButtons 
        const button = document.createElement("button");
        button.textContent = mood;
        button.id = mood;
        // button.classList.add("btn", "btn-primary", "m-2");
        button.addEventListener("click", () => {
            fetchMovies(mood);
            // alert(`You clicked on ${mood}`);
        });
        moodButtons.appendChild(button);
    });

    displayContainer("moodContainer");

};

const fetchMovies = async (mood) => {
    console.log("fetchMovies");
    try {
        const response = await fetch(`/movies?mood=${encodeURIComponent(mood)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data: ", data);
        console.log("data.data: ", data.data);
        displayMovies(data.data);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};


const displayMovies = (movies) => {
    console.log("displayMovies");
    console.log("movies: ", movies);
    const moviesDiv= document.getElementById("movies");
    moviesDiv.innerHTML = "";


    movies.forEach((movie) => {

        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        movieDiv.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" class="poster">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

        moviesDiv.appendChild(movieDiv);
    });

    displayContainer("movieContainer");
}

const containers = ["introContainer", "moodContainer", "movieContainer"];

const displayContainer = (containerName) => {
    console.log("displayContainer: ", containerName);
    containers.forEach((container) => {
        const element = document.getElementById(container);
        if (container === containerName) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });
}
