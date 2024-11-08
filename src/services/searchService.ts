import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";
import config from "../config/config";
import { SearchResult, ScrapeResult } from "../types/searchResult";

export class SearchService {
  private baseUrl: string;
  private axiosInstance;

  constructor() {
    this.baseUrl = config.searxngInstance;

    this.axiosInstance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: config.timeout,
    });
  }

  async search(query: string, page: number = 1): Promise<SearchResult[]> {
    try {
      const response = await this.axiosInstance.get(`${this.baseUrl}/search`, {
        params: {
          q: query,
          format: "html",
          page: page,
          category_general: 1,
          results: config.maxResults,
        },
      });

      const $ = cheerio.load(response.data);
      const results: SearchResult[] = [];

      const resultSelectors = [
        "#main_results .result",
        ".result-default",
        ".results .result",
        ".result-item",
        'div[class*="result"]',
      ];

      for (const selector of resultSelectors) {
        $(selector).each((index, element) => {
          if (results.length >= config.maxResults) {
            return false;
          }

          const titleElement = $(element)
            .find("h3, .title, .result-title, a")
            .first();
          const linkElement = $(element).find("a").first();
          const snippetElement = $(element)
            .find(".content, .snippet, .result-content, .description")
            .first();

          const title = titleElement.text().trim();
          const link = linkElement.attr("href") || "";
          const snippet = snippetElement.text().trim();

          if (title || link || snippet) {
            results.push({
              title,
              link,
              snippet,
            });
          }
        });

        if (results.length > 0) break;
      }

      return results.slice(0, config.maxResults);
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  }

  async scrapeUrl(url: string): Promise<ScrapeResult> {
    try {
      const response = await this.axiosInstance.get(url);
      const $ = cheerio.load(response.data);

      // Remove unwanted elements
      $("script").remove();
      $("style").remove();
      $("nav").remove();
      $("header").remove();
      $("footer").remove();
      $('[style*="display: none"]').remove();

      // Extract useful metadata
      const title = $("title").text().trim();
      const description = $('meta[name="description"]').attr("content") || "";

      // Get main content
      let content = "";

      // Try to find main content area
      const mainSelectors = [
        "main",
        "article",
        ".content",
        "#content",
        ".main-content",
      ];
      for (const selector of mainSelectors) {
        const mainContent = $(selector).text().trim();
        if (mainContent) {
          content = mainContent;
          break;
        }
      }

      // If no main content found, use body
      if (!content) {
        content = $("body").text().trim();
      }

      // Clean up the content
      content = content.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim();

      return {
        content,
        url,
        metadata: {
          title,
          description,
          lastScraped: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Scraping error:", error);
      throw error;
    }
  }
}
