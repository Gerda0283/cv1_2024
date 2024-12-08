
const fs = require('fs-extra');
const jimp = require('jimp');
// const sizeOf = require('image-size');

const WATERMARK_MARGIN_PERCENTAGE = 0;
const ONE_X_SIZE_IMAGE = 2000;

const initialDir = './source/img/non-watermarked';
const resultDir ='./source/img/watermarked'

async function addWatermarkToImages() {

  if (!initialDir) {

    await fs.mkdir(initialDir);
  }

  await fs.copy('./source/img/1x/non-watermarked/', initialDir);
  await fs.copy('./source/img/2x/non-watermarked/', initialDir);
  await fs.copy('./source/img/plugs/non-watermarked/', initialDir);

  const watermarkImage = await jimp.read('./source/img/watermark.png');
  const watermarkImageTwoX = await jimp.read('./source/img/watermark_2x.png');

  const arrFileNames = fs.readdirSync('./source/img/non-watermarked');

  for (const fileName of arrFileNames) {

    const image = await jimp.read(`./source/img/non-watermarked/${fileName}`);

    const xMargin = (image.bitmap.width * WATERMARK_MARGIN_PERCENTAGE) / 25;
    const yMargin = (image.bitmap.width * WATERMARK_MARGIN_PERCENTAGE) / 20;
    let x;
    let y;

    if(image.bitmap.width > ONE_X_SIZE_IMAGE) {

      x = image.bitmap.width - watermarkImageTwoX.bitmap.width - xMargin;
      y = image.bitmap.height - watermarkImageTwoX.bitmap.height - yMargin;

      image.composite(watermarkImageTwoX, x, y, {
        mode: jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.8,
        opacityDest: 0.8,
      });

    } else {

      x = image.bitmap.width - watermarkImage.bitmap.width - xMargin;
      y = image.bitmap.height - watermarkImage.bitmap.height - yMargin;

      image.composite(watermarkImage, x, y, {
        mode: jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.8,
        opacityDest: 0.8,
      });
    }

    console.log(`add watermarked image ${fileName}`);

    const newImageFileName = `watermarked_${fileName}`;
    image.write(`${resultDir}/${newImageFileName}`);
  }
}

addWatermarkToImages();


