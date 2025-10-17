export type TNewsApiArticle = {
  source: {
    id: null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type TNewsApiResponse = {
  status: string;
  totalResults: number;
  articles: TNewsApiArticle[];
};

export type TNewsApiSourceResponse = {
  status: string;
  sources: TNewsApiSource[];
};

export type TNewsApiSource = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

export type TTheNewsAPIResponse = {
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
  data: TTheNewsAPI[];
};

export type TTheNewsAPI = {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  categories: string[];
  locale: string;
};

export type TTheNewsApiSource = {
  source_id: string;
  domain: string;
  language: string;
  locale: null;
  categories: string[];
};

export type TTheNewsApiSourceResponse = {
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
  data: TTheNewsApiSource[];
};

export type TGuardianApiResponse = {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: TGuardianAPI[];
  };
};

export type TGuardianAPI = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  isHosted: false;
  pillarId: string;
  pillarName:  string;
};
