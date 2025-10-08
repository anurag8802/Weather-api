# Weather API

A Node.js REST API that provides weather information for cities using OpenWeatherMap API with Redis caching for improved performance.

## Features

- 🌤️ Get current weather data for any city
- ⚡ Redis caching to reduce API calls and improve response times
- 🚀 Express.js framework for fast and reliable API endpoints
- 📦 Modern ES6+ JavaScript with import/export syntax

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **Redis** (for caching)
- **OpenWeatherMap API Key** (free at [openweathermap.org](https://openweathermap.org/api))

## Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd weather-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Redis**
   
   **Option A: Using Docker (Recommended)**
   ```bash
   docker run --name redis -p 6379:6379 -d redis
   ```
   
   **Option B: Install Redis locally**
   - **Windows**: Download from [Redis for Windows](https://github.com/microsoftarchive/redis/releases)
   - **macOS**: `brew install redis && brew services start redis`
   - **Linux**: `sudo apt-get install redis-server && sudo systemctl start redis`

4. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   REDIS_URL=redis://localhost:6379
   WEATHER_API_KEY=your_openweathermap_api_key_here
   CACHE_EXPIRE=300
   ```

## Usage

1. **Start the server**
   ```bash
   npm start
   ```
   
   The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

2. **API Endpoints**

   ### Get Weather Data
   ```
   GET /api/weather/:city
   ```
   
   **Example Request:**
   ```bash
   curl http://localhost:5000/api/weather/London
   ```
   
   **Example Response:**
   ```json
   {
     "coord": {
       "lon": -0.1257,
       "lat": 51.5085
     },
     "weather": [
       {
         "id": 800,
         "main": "Clear",
         "description": "clear sky",
         "icon": "01d"
       }
     ],
     "base": "stations",
     "main": {
       "temp": 15.5,
       "feels_like": 14.8,
       "temp_min": 13.9,
       "temp_max": 17.2,
       "pressure": 1023,
       "humidity": 72
     },
     "visibility": 10000,
     "wind": {
       "speed": 3.6,
       "deg": 230
     },
     "clouds": {
       "all": 0
     },
     "dt": 1634567890,
     "sys": {
       "type": 2,
       "id": 2019646,
       "country": "GB",
       "sunrise": 1634523456,
       "sunset": 1634561234
     },
     "timezone": 3600,
     "id": 2643743,
     "name": "London",
     "cod": 200
     }
   ```

## Project Structure

```
weather-api/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js             # Server startup
│   ├── config/
│   │   └── redisClient.js    # Redis connection setup
│   ├── controllers/
│   │   └── weatherController.js # Weather API logic
│   └── routes/
│       └── weatherRoutes.js  # API route definitions
├── package.json
└── README.md
```

## How It Works

1. **Request Processing**: When a weather request comes in for a city, the API first checks if the data exists in Redis cache.

2. **Cache Hit**: If cached data exists and hasn't expired, it returns the cached data immediately.

3. **Cache Miss**: If no cached data exists, the API:
   - Makes a request to OpenWeatherMap API
   - Caches the response in Redis with the specified expiration time
   - Returns the weather data to the client

4. **Caching Benefits**:
   - Reduces external API calls
   - Improves response times
   - Reduces API rate limiting issues

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |
| `WEATHER_API_KEY` | OpenWeatherMap API key | Required |
| `CACHE_EXPIRE` | Cache expiration time in seconds | `300` |

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Missing city parameter
- **404 Not Found**: Invalid route
- **500 Internal Server Error**: Server or external API errors

## Development

### Running in Development Mode

```bash
npm run dev
```

### Adding New Features

1. Create new routes in `src/routes/`
2. Add corresponding controllers in `src/controllers/`
3. Update `src/app.js` to include new routes

## Troubleshooting

### Common Issues

1. **Redis Connection Error**
   - Ensure Redis is running: `redis-cli ping`
   - Check Redis URL in `.env` file
   - Verify Redis port is not blocked

2. **Weather API Errors**
   - Verify your OpenWeatherMap API key is valid
   - Check API quota limits
   - Ensure city name is spelled correctly

3. **Port Already in Use**
   - Change the PORT in your `.env` file
   - Or kill the process using the port: `lsof -ti:5000 | xargs kill`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- [Redis](https://redis.io/) for fast caching capabilities
- [Express.js](https://expressjs.com/) for the web framework
