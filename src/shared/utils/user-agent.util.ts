import { UAParser } from "ua-parser-js";

export const parseUserAgent = (ua?: string) => {
  if (!ua) return {};

  const parser = new UAParser(ua);
  const result = parser.getResult();

  return {
    browser: result.browser.name,
    os: result.os.name,
  };
};
