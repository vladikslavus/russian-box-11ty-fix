import fs from 'node:fs';

const SPRITE_FILE = 'public/sprites/sprite.json';

function getSprite() {
  if (!fs.existsSync(SPRITE_FILE)) {
    console.error('Sprite file not found');
    return;
  }

  return JSON.parse(fs.readFileSync('public/sprites/sprite.json', 'utf-8'));
}

const sprite = getSprite();

function checkIcon(type, name) {
  if (!sprite[type]) {
    return `Type ${type} not found`;
  }
  if (!sprite[type].icons.includes(name)) {
    return `Icon ${name} not found in ${type}`;
  }
  return false;
}

export default function (type, name, attrs) {
  const error = checkIcon(type, name);
  if (error) {
    return error;
  }
  return `<svg ${attrs}>`
    + `<use xlink:href="/sprites/${type}.svg#${name}"></use>`
    + `</svg>`;
};
