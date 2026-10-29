export type ResponseStatus = 'ok' | 'error';

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
}

export type ApiResponse<T> = {
  status: ResponseStatus;
} & T; 

export interface ArticleSource {
  id: string | null;
  name: string;
}

export type NewsResponse = ApiResponse<{
  totalResults: number;
  articles: Article[];
}>;

export type SourcesResponse = ApiResponse<{
  sources: SourceItem[];
}>;


export interface Article {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}


export interface SourceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}



export interface RequestArgs {
  endpoint: string;
  options?: Record<string, string>
}