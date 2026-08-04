const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", () =>
    yaml.load(fs.readFileSync(path.join(__dirname, "_data", "site.yml"), "utf8"))
  );

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  // Pages not yet converted to .njk templates — passed through unmodified until migrated.
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("leistungen.html");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk"],
  };
};
