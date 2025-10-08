import axios from "axios";
import redisClient from "../config/redisClient";
import dotenv from "dotenv";

dotenv.config();

export const getWeather = async(req, res) => {
    const {city} = req.params;
    if(!city){
        return res.status(401).json({error: "City is required"});
    }

    try{
        const cachekey = city.toLowerCase();
        const cacheData = await redisClient.get(cachekey);
        if(cacheData){
            return res.status(200).json(JSON>parse(cacheData));
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;
        const {data} = await axios.get(url);

        await redisClient.setEx(
            cacheKey,
            process.env.CACHE_EXPIRE,
            JSON.stringify(data)
        )

        return res.status(200).json(data);

    }catch(error){
        return res.status(500).json({error: "Internal server error"});
    }
};