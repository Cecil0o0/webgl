const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const prettier = require('prettier');

const moduleName = argv.S || 'new-app';
const appRelativePath = 'src/pages';
const dst = path.resolve(__dirname, `../../${appRelativePath}/`);
const source = path.resolve(__dirname, argv.T === 'snowy' ? 'snowy-template' : 'template');

fs.readdir(source, (err, files) => {
  if (err) return;
  const absoluteModulePath = path.resolve(dst, moduleName);
  try {
    fs.statSync(absoluteModulePath);
  } catch (e) {
    fs.mkdirSync(absoluteModulePath);
  }

  Promise.all(
      files.map((filename) => {
        return cpFile(
            path.resolve(source, filename),
            path.resolve(absoluteModulePath, filename.slice(0, -4))
        );
      })
  ).then(() => {
    const targetFile = path.resolve(__dirname, '../../config/apps.js');
    const apps = require(targetFile);
    if (!apps.find((config) => config.name === moduleName)) {
      apps.push({
        name: moduleName,
        title: moduleName,
        entry: `${appRelativePath}/${moduleName}`,
      });
      fs.writeFileSync(targetFile, prettier.format(`module.exports = ${JSON.stringify(apps)}`, { parser: 'babel' }), {
        flag: 'w',
      });
    }
  });
});

function cpFile(from, to) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(from)
        .pipe(fs.createWriteStream(to))
        .on('close', resolve)
        .once('error', reject);
  });
}
