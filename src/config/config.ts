import dotenv from "dotenv";
dotenv.config();

const config = {
  searxngInstance: "https://avoxfg.tunnel.pyjam.as",
  port: process.env.PORT || 3000,
  maxResults: 5,
  timeout: 10000, // 10 seconds timeout for requests
};

export default config;
