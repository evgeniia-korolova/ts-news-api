export interface ArticleSource {
  id: string | null;
  name: string;
}


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


export interface NewsResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Article[];
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


export interface SourcesResponse {
  status: 'ok' | 'error';
  sources: SourceItem[];
}

export interface RequestArgs {
  endpoint: string;
  options?: Record<string, string>
}