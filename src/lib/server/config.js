import fs from "fs";
import { resolve } from "path";

export function getBlogConfig() {
  const raw = fs.readFileSync(
    resolve(process.cwd(), "blog.config.js"),
    "utf-8"
  );
  const config = eval(
    `((module = { exports }) => { ${raw}; return module.exports })()`
  );

  // Only expose non-sensitive parts for client use
  delete config.notionPageId;
  delete config.notionAccessToken;

  return config;
}
