import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import SVGSpriter from 'svg-sprite';

const SOURCE_DIR = 'src/resources/icons';
const OUTPUT_DIR = 'public/sprites/';

await fs.mkdir(OUTPUT_DIR, {
  recursive: true,
});

async function isDir(fileName) {
  const stat = await fs.stat(fileName);
  return stat.isDirectory();
}

async function getDirs(dir) {
  const entities = (await fs.readdir(dir)).map(entity => path.join(dir, entity));
  const stats = await Promise.all(entities.map(isDir));

  return entities.filter((_, index) => stats[index]);
}

async function getSvgFiles(dir) {
  const entities = await fs.readdir(dir);

  return entities
    .filter(fileName => fileName.endsWith('.svg'))
    .map(fileName => path.join(dir, fileName));
}

const config = {
  mode: {
    symbol: true,
  },
};

async function makeSvg(dir) {
  const spriter = new SVGSpriter(config);
  const files = await getSvgFiles(dir);

  if (files.length === 0) {
    return null;
  }

  for (const file of files) {
    spriter.add(file, null, await fs.readFile(file, 'utf-8'));
  }

  const { result, data } = await spriter.compileAsync();

  return {
    content: result.symbol.sprite.contents,
    icons: data.symbol.shapes.map(shape => shape.name),
  };
}

const dirs = await getDirs(SOURCE_DIR);

const spriteDeclaration = {};

for (const dir of dirs) {
  const svg = await makeSvg(dir);
  spriteDeclaration[path.basename(dir)] = {
    hash: createHash('md5').update(svg.content).digest('hex'),
    icons: svg.icons,
  };
  await fs.writeFile(path.join(OUTPUT_DIR, `${path.basename(dir)}.svg`), svg.content);
}

await fs.writeFile(path.join(OUTPUT_DIR, 'sprite.json'), JSON.stringify(spriteDeclaration, null, 2));
