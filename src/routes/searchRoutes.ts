import { Router } from "express";
import { SearchController } from "../controllers/searchController";

const router = Router();
const searchController = new SearchController();

router.get("/search", (req, res) => searchController.search(req, res));
router.get("/scrape", (req, res) => searchController.scrape(req, res));

export default router;
