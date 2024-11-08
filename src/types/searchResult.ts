export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export interface ScrapeResult {
  content: string;
  url: string;
  metadata?: {
    title?: string;
    description?: string;
    lastScraped: string;
  };
}
