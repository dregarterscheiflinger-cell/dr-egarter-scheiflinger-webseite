const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const icons = require("./_data/icons.js");

module.exports = function (eleventyConfig) {
  const loadYaml = (relPath) =>
    yaml.load(fs.readFileSync(path.join(__dirname, relPath), "utf8"));

  eleventyConfig.addGlobalData("site", () => loadYaml("_data/site.yml"));
  eleventyConfig.addGlobalData("home", () => loadYaml("content/home.yml"));

  eleventyConfig.addShortcode("icon", function (name, opts) {
    opts = opts || {};
    const size = opts.size || 24;
    const strokeWidth = opts.strokeWidth || 1.7;
    const cls = opts.class || "icon";
    const inner = icons[name] || "";
    if (!inner) {
      console.warn(`[icon shortcode] Unknown icon name: "${name}"`);
    }
    return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

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
