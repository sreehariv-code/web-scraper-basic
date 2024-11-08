# Ascend Web Scrapper

## Overview

The Ascend Web Scrapper is a Node.js-based service designed for web scraping and data extraction tasks.

---

## Prerequisites

- **Node.js**: Version 21 or higher (Node Version Manager is recommended for easy version management).
- **Node Version Manager (NVM)**: For installing and managing multiple versions of Node. [Set up NVM by following these instructions](https://github.com/nvm-sh/nvm#installing-and-updating).

---

## Setup Instructions

### 1. Clone the Repository

To get started, clone the repository to your local machine by running the following command in your terminal:

```bash
git clone https://git.uvjtech.com/betson.thomas/ascend.git
```

### 2. Open the Project Directory

Navigate to the project folder in your terminal:

```bash
cd ascend
```

### 3. Install Dependencies

Install the required Node packages by running:

```bash
npm install
```

### 4. Start the Service

To run the web scraper, execute:

```bash
npm run dev
```

The service will start running on **port 3000**.

---

## Endpoints

The Ascend Web Scrapper exposes the following endpoints for web search and scraping:

### 1. Search Endpoint

- **URL**: `/api/search`
- **Method**: `GET`
- **Description**: Searches the web for content based on a provided query.
- **Parameters**:
  - `query` (required): The content to search on the web.
- **Example**:
  ```http
  GET http://localhost:3000/api/search?query=content_to_search_in_web
  ```

### 2. Scrape Endpoint

- **URL**: `/api/scrape`
- **Method**: `GET`
- **Description**: Scrapes content from a specific URL.
- **Parameters**:
  - `url` (required): The URL to scrape.
- **Example**:
  ```http
  GET http://localhost:3000/api/scrape?url=the_url_to_scrape
  ```

---

## Usage

After following the setup steps, the service will be available on **port 3000** in development mode. Use the endpoints to search for content or scrape data from a specific URL.

---

## Additional Notes

Ensure you’re using Node v21 or newer. If you have multiple Node versions installed, Node Version Manager (NVM) can help switch between versions easily. [Follow the NVM setup guide here](https://github.com/nvm-sh/nvm#installing-and-updating) to install it.

---

## Troubleshooting

- **Missing Dependencies**: If `npm install` fails, try clearing the npm cache with `npm cache clean --force` and re-run the command.
- **Port Conflicts**: Make sure port 3000 is free. Use `lsof -i :3000` to check for processes using the same port.

---
