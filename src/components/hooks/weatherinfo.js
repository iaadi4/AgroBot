import { useEffect, useState } from "react";

const api = import.meta.env.VITE_weather_api;

function useWeatherInfo(city) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=yes`)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((e) => console.log(e))
    }, [city])
    return data
}

export default useWeatherInfo