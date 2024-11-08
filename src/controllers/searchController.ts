import { Request, Response } from "express";
import { SearchService } from "../services/searchService";
import config from "../config/config";
import axios from "axios";

export class SearchController {
  private searchService: SearchService;

  constructor() {
    this.searchService = new SearchService();
  }

  async search(req: Request, res: Response) {
    try {
      const { query, page } = req.query;

      if (!query || typeof query !== "string") {
        return res.status(400).json({
          success: false,
          error: "Query parameter is required",
        });
      }

      const pageNum = page ? parseInt(page as string) : 1;
      const results = await this.searchService.search(query, pageNum);

      res.json({
        success: true,
        data: results,
        page: pageNum,
        query: query,
        resultCount: results.length,
        maxResults: config.maxResults,
        message: `Showing ${results.length} out of ${config.maxResults} maximum results`,
      });
    } catch (error) {
      console.error("Search controller error:", error);

      const statusCode = axios.isAxiosError(error)
        ? error.response?.status || 500
        : 500;

      res.status(statusCode).json({
        success: false,
        error: "Failed to fetch search results",
        message: error instanceof Error ? error.message : "Unknown error",
        query: req.query.query,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async scrape(req: Request, res: Response) {
    try {
      const { url } = req.query;

      if (!url || typeof url !== "string") {
        return res.status(400).json({
          success: false,
          error: "URL parameter is required",
        });
      }

      // Validate URL format
      try {
        new URL(url);
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: "Invalid URL format",
        });
      }

      const result = await this.searchService.scrapeUrl(url);

      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Scrape controller error:", error);

      const statusCode = axios.isAxiosError(error)
        ? error.response?.status || 500
        : 500;

      res.status(statusCode).json({
        success: false,
        error: "Failed to scrape URL",
        message: error instanceof Error ? error.message : "Unknown error",
        url: req.query.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
