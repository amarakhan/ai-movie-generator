
# AI Movie Generator

AI Movie Generator is a Node.js application that recommends movies based on the user's mood using the OMDB API and Anthropic AI.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ai-movie-generator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ai-movie-generator
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your API keys:

   ```env
   ANTHROPIC_API_KEY=your_anthropic_api_key
   OMDB_API_KEY=your_omdb_api_key
   ```

## Usage

To start the server, run:

```bash
npm start
```

The server will start on the port specified in the `.env` file or default to port 3000.

## API Endpoints

### Get Movies

- **URL:** `/movies`
- **Method:** `GET`
- **Query Parameters:**
  - `mood` (required): The mood for which movie recommendations are needed.

**Example Request (testing locally):**

```bash
curl -X GET "http://localhost:3000/movies?mood=happy"
```

**Example Response:**

```json
{
  "data": [
    {
      "Title": "Happy Gilmore",
      "Year": "1996",
      "imdbID": "tt0116483",
      "Type": "movie",
      "Poster": "https://example.com/poster1.jpg"
    },
    {
      "Title": "The Pursuit of Happyness",
      "Year": "2006",
      "imdbID": "tt0454921",
      "Type": "movie",
      "Poster": "https://example.com/poster2.jpg"
    },
    {
      "Title": "Singin' in the Rain",
      "Year": "1952",
      "imdbID": "tt0045152",
      "Type": "movie",
      "Poster": "https://example.com/poster3.jpg"
    },
    {
      "Title": "Amelie",
      "Year": "2001",
      "imdbID": "tt0211915",
      "Type": "movie",
      "Poster": "https://example.com/poster4.jpg"
    }
  ],
  "usage": {},
  "model": "claude-3-opus-20240229"
}
```

### Home Route

- **URL:** `/`
- **Method:** `GET`
- **Response:** Returns the homepage.

