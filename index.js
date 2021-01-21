function cutImg({ ctx, rowCount, colCount }) {
  const width = Math.floor(ctx.canvas.width / rowCount);
  const height = Math.floor(ctx.canvas.height / colCount);
  const imgPromiseArr = [];

  const newCanvas = document.createElement("canvas");
  const newCtx = newCanvas.getContext("2d");
  newCanvas.width = width;
  newCanvas.height = height;
  for (let i = 0; i < colCount; i += 1) {
    // y轴 纵向分割
    for (let j = 0; j < rowCount; j += 1) {
      // x轴 横向分割
      const imageData = ctx.getImageData(j * width, i * height, width, height);
      // 写入分割后的数据
      newCtx.putImageData(imageData, 0, 0);
      const promise = new Promise((resolve) => {
        // 转换为blob
        newCanvas.toBlob((blob) => {
          resolve(blob);
        });
      });
      // 清除数据
      newCtx.clearRect(0, 0, width, height);
      imgPromiseArr.push(promise);
    }
  }
  return Promise.all(imgPromiseArr);
}
function cropImg({ url, rowCount, colCount }) {
  // 获取图片宽高 绘制到canvas中
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  return new Promise((resolve) => {
    img.onload = async () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      // 分割图片
      const imgArr = await cutImg({ ctx, rowCount, colCount });
      resolve(imgArr);
    };
    img.crossOrigin = "anonymous";
    img.src = url;
  });
}
export default cropImg;
