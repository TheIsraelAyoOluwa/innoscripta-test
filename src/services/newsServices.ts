import axios from "axios";
import type {
  TGuardianApiResponse,
  TNewsApiResponse,
  TNewsApiSource,
  TNewsApiSourceResponse,
  TTheNewsAPIResponse,
  TTheNewsApiSource,
  TTheNewsApiSourceResponse,
} from "../types";
import { NewsApiInstance } from "../utils/newsApi";
import { serializeNews, serializeSourceOptions } from "@/utils/newsSerializer";
import { handleApiError } from "@/utils/httpApiErrors";

type TFilterProps = {
  query: string;
  from: string;
  sortBy: string;
  source: string;
  to: string;
  category: string;
};

export const getAllNewsApiData = async (data: TFilterProps) => {
  try {
    const params: Record<string, string> = {};

    if (data.query) params.q = data.query;
    if (data.source) params.sources = data.source;
    if (data.from) params.from = data.from;
    if (data.to) params.to = data.to;
    if (data.sortBy) params.sortBy = data.sortBy;

    const queryString = new URLSearchParams(params).toString();

    const response = await NewsApiInstance.get<TNewsApiResponse>(
      `/everything?${queryString}`
    );

    const serializedArticles = response?.data?.articles?.map((article) =>
      serializeNews({ article, source: "newsapi" })
    );

    return serializedArticles;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getAllNewsApiSourceData = async (data: TFilterProps) => {
  try {
    const response = await NewsApiInstance.get<TNewsApiSourceResponse>(
      `/top-headlines/sources?category=${data.category}`
    );

    console.log(response, "responmse")

    const serializedSource = serializeSourceOptions({
      sources: response?.data?.sources as TNewsApiSource[],
      source: "newsapi",
    });
    return serializedSource;

  } catch (error) {
    throw handleApiError(error);
  }
};

export const getAllTheNewsApiData = async (data: TFilterProps) => {
  try {
    const baseUrl = "https://api.thenewsapi.com/v1/news/all";
    const params: Record<string, string> = {
      api_token: "InxA1trnkKzZICOCi82u3775nbhIJQKLuh51ATSq",
      language: "en",
      limit: "20",
    };

    if (data.query) params.search = data.query;
    if (data.source) params.domain = data.source;
    if (data.from) params.published_before = data.from;
    if (data.to) params.published_after = data.to;
    if (data.category) params.categories = data.category;

    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}?${queryString}`;

    const response = await axios.get<TTheNewsAPIResponse>(url);

    const serializedArticles = response?.data?.data?.map((article) =>
      serializeNews({ article, source: "thenewsapi" })
    );

    return serializedArticles;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getAllTheNewsApiSourceData = async () => {
  try {
    const response = await axios.get<TTheNewsApiSourceResponse>(
      `https://api.thenewsapi.com/v1/news/sources?api_token=InxA1trnkKzZICOCi82u3775nbhIJQKLuh51ATSq&language=en
`
    );

    const serializedSource = serializeSourceOptions({
      sources: response?.data?.data as TTheNewsApiSource[],
      source: "thenewsapi",
    });
    return serializedSource;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getAllGuardianData = async (data: TFilterProps) => {
  try {
    const response = await axios.get<TGuardianApiResponse>(
      `https://content.guardianapis.com/search?api-key=b9103d5f-164f-4fcc-9bf2-c6e3d7920372&q=${data.query}
`
    );

    const serializedArticles = response?.data?.response?.results.map(
      (article) => serializeNews({ article, source: "guardian" })
    );

    return serializedArticles;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};
