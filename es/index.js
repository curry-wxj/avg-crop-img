import _regeneratorRuntime from '@babel/runtime-corejs2/regenerator';
import _asyncToGenerator from '@babel/runtime-corejs2/helpers/asyncToGenerator';
import _Promise from '@babel/runtime-corejs2/core-js/promise';

function cutImg(_ref) {
  var ctx = _ref.ctx,
      rowCount = _ref.rowCount,
      colCount = _ref.colCount;
  var width = Math.floor(ctx.canvas.width / rowCount);
  var height = Math.floor(ctx.canvas.height / colCount);
  var imgPromiseArr = [];
  var newCanvas = document.createElement("canvas");
  var newCtx = newCanvas.getContext("2d");
  newCanvas.width = width;
  newCanvas.height = height;

  for (var i = 0; i < colCount; i += 1) {
    // y轴 纵向分割
    for (var j = 0; j < rowCount; j += 1) {
      // x轴 横向分割
      var imageData = ctx.getImageData(j * width, i * height, width, height); // 写入分割后的数据

      newCtx.putImageData(imageData, 0, 0);
      var promise = new _Promise(function (resolve) {
        // 转换为blob
        newCanvas.toBlob(function (blob) {
          resolve(blob);
        });
      }); // 清除数据

      newCtx.clearRect(0, 0, width, height);
      imgPromiseArr.push(promise);
    }
  }

  return _Promise.all(imgPromiseArr);
}

function cropImg(_ref2) {
  var url = _ref2.url,
      _ref2$rowCount = _ref2.rowCount,
      rowCount = _ref2$rowCount === void 0 ? 2 : _ref2$rowCount,
      _ref2$colCount = _ref2.colCount,
      colCount = _ref2$colCount === void 0 ? 2 : _ref2$colCount;
  // 获取图片宽高 绘制到canvas中
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  return new _Promise(function (resolve) {
    img.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var imgWidth, imgHeight, imgArr;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              imgWidth = img.width;
              imgHeight = img.height;
              canvas.width = imgWidth;
              canvas.height = imgHeight;
              ctx.drawImage(img, 0, 0, imgWidth, imgHeight); // 分割图片

              _context.next = 7;
              return cutImg({
                ctx: ctx,
                rowCount: rowCount,
                colCount: colCount
              });

            case 7:
              imgArr = _context.sent;
              resolve(imgArr);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    img.crossOrigin = "anonymous";
    img.src = url;
  });
}

export default cropImg;
