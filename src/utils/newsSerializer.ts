import type {
  TGuardianAPI,
  TNewsApiArticle,
  TNewsApiSource,
  TTheNewsAPI,
  TTheNewsApiSource,
} from "@/types";

type TSerializeNews =
  | { article: TNewsApiArticle; source: "newsapi" }
  | { article: TTheNewsAPI; source: "thenewsapi" }
  | { article: TGuardianAPI; source: "guardian" | "nytimes" };

export function serializeNews({ article, source }: TSerializeNews) {
  switch (source) {
    case "newsapi":
      return {
        title: article.title ?? "",
        description: article.description ?? "",
        url: article.url ?? "",
        imageUrl: article.urlToImage ?? "",
        source: "NewsAPI",
        publishedAt: article.publishedAt ?? "",
      };

    case "thenewsapi":
      return {
        title: article.title ?? "",
        description: article.description ?? "",
        url: article.url ?? "",
        imageUrl: article.image_url ?? "",
        source: "TheNewsAPI",
        publishedAt: article.published_at ?? "",
      };

    case "guardian":
      return {
        title: article.webTitle ?? "",
        description: "",
        url: article.webUrl ?? "",
        imageUrl: "",
        source: "The Guardian",
        publishedAt: article.webPublicationDate ?? "",
      };

    case "nytimes":
      return {
        title: article.webTitle ?? "",
        description: "",
        url: article.webUrl ?? "",
        imageUrl: "",
        source: "The Guardian",
        publishedAt: article.webPublicationDate ?? "",
      };

    default:
      return null;
  }
}

type TSerializeSourceInput =
  | { sources: TNewsApiSource[]; source: "newsapi" }
  | { sources: TTheNewsApiSource[]; source: "thenewsapi" };

export type TSerializedSourceOption = {
  label: string;
  value: string;
  source: string;
};

export function serializeSourceOptions({
  sources,
  source,
}: TSerializeSourceInput): TSerializedSourceOption[] {
  switch (source) {
    case "newsapi":
      return sources.map((item) => ({
        label: item.name ?? "Unknown",
        value: item.id ?? "",
        source: "NewsAPI",
      }));

    case "thenewsapi":
      return sources.map((item) => ({
        label: item.source_id ?? "Unknown",
        value: item.source_id ?? "",
        source: "TheNewsAPI",
      }));

    default:
      return [];
  }
}
