import axios from "axios";
import { setupGlobalAxiosInstanceAuth } from "./axiosSetup";

console.log(import.meta.env.VITE_REACT_APP_NEWS_API_KEY, "key");

export const NewsApiInstance = axios.create({
  baseURL: `https://newsapi.org/v2`,
  headers: {
    Accept: "application/json",
    Authorization: `${import.meta.env.VITE_REACT_APP_NEWS_API_KEY}`,
  },
});

setupGlobalAxiosInstanceAuth(NewsApiInstance);
