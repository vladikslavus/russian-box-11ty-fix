import vm from 'node:vm';
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import { transform } from 'esbuild';
import numberFormat from './11ty/numberFormat.js';
import svgIcon from './11ty/svgIcon.js';
import viteConfig from './vite.config.js';

async function transformTs(content) {
  return await transform(content, {
    format: 'cjs',
    loader: 'ts',
  });
}

function exec(content) {
  const ctx = {
    module: {},
  };

  vm.createContext(ctx);
  vm.runInContext(content, ctx);
  return ctx.module.exports;
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: viteConfig,
  });
  eleventyConfig.addShortcode('svgIcon', svgIcon);
  eleventyConfig.addNunjucksFilter('numberFormat', numberFormat);
  eleventyConfig.addPassthroughCopy('src/resources');
  eleventyConfig.addPassthroughCopy('public/images', 'images');
  eleventyConfig.addDataExtension('ts', async (fileContent) => {
    const transformResult = await transformTs(fileContent);
    return exec(transformResult.code);
  });
  return {
    dir: {
      input: 'src/views',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk'],
  };
};
