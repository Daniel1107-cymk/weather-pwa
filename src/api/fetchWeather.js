import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchWeather = async (city) => {
  try {
    const { data } = await axios.get(URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
