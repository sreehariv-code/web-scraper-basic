const config = {
  searxngInstance: "https://search.ascend.de",
  port: process.env.PORT || 3000,
  maxResults: 5,
  timeout: 10000, // 10 seconds timeout for requests
};

export default config;
