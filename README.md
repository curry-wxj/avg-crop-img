## 图片裁剪
- 可以传一张图片地址；会将图片裁剪为大小相同的块
- 默认裁剪为4张图片
  - rowCount默认为2；表示横向为2
  - colCount默认为2；表示纵向为2
```js
import cropImg from "avg-crop-img";
cropImg({
  url: "https://p437.ssl.qhimgs4.com/t0133e543baa348bae0.png",
  rowCount: 3,
  colCount: 2,
}).then((res) => {
  console.log(res);
});
```
