const jimp = require('jimp');

const imgResize = async (path, imgSize) => {
  const image = await jimp.read(path);

  await image.resize(imgSize, jimp.AUTO);
  await image.writeAsync(path);
};

module.exports = {
  imgResize,
};
