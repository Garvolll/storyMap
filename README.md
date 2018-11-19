# story-map

> 参考[story-map](http://storymaps.arcgis.com/zh-cn/)基于位置讲故事的概念，简单map-tour形式的实现

## 框架和工具
vue+vue-router+vuex+webpack
vue-amap （vue-高德地图组件）

## 关键点
MarkerClusterer：marker点聚合
renderCluserMarker：点聚合后的圆形div的展示效果
```JavaScript
{
   _renderCluserMarker(context) {          //自定义渲染聚合圆的样式
            var factor = Math.pow(context.count / this.markersCount, 0.8)
            var div = document.createElement('div');
            var parentDiv = document.createElement('div');
            // var Hue = 180 - factor * 90;
            // var Hue = (0.20595238095238097.toFixed(4)) * 360
            //现在设置的比较随意，具体可设计好色差色调等进行算法调整
            var Hue = 84
            var GreyLevel = 100 - ((factor * 60 + 50).toFixed(2))
            var bgColor = `hsla(${Hue},56.80%,${GreyLevel}%,0.9)`;
            var fontColor = 'hsla(' + Hue + ',56.80%,20%,1)';
            var borderColor = `hsla(${Hue},56.80%,${GreyLevel}%,0.9)`;
            var shadowColor = 'hsla(' + Hue + ',56.80%,50%,1)';

            div.style.backgroundColor = bgColor         //内层圆样式
            var size = Math.round(30 + Math.pow(context.count / this.markersCount, 1 / 5) * 20);
            div.style.width = div.style.height = size + 'px';
            div.style.border = 'solid 5px ' + borderColor;
            div.style.borderRadius = size / 2 + 'px';
            div.style.boxShadow = '0 0 1px ' + shadowColor;
            div.innerHTML = context.count;
            div.style.lineHeight = size - 7 + 'px';
            div.style.color = fontColor;
            div.style.color = "#fff";
            div.style.fontSize = '14px';
            div.style.textAlign = 'center';
            div.style.position = "absolute";
            div.style.top = "0";
            div.style.right = "0";
            div.style.left = "0";
            div.style.bottom = "0";
            div.style.margin = "auto";

            var parentDivBgColor = `hsla(${Hue},56.80%,${GreyLevel}%,0.9)`;   //外层圆样式
            parentDiv.style.backgroundColor = parentDivBgColor
            parentDiv.style.width = parentDiv.style.height = (size * 1.4) + 'px';
            parentDiv.style.border = 'solid 1px ' + borderColor;
            parentDiv.style.borderRadius = (size * 1.4) / 2 + 'px';
            parentDiv.style.boxShadow = '0 0 1px ' + shadowColor;
            parentDiv.style.lineHeight = size * 1.4 + 'px';
            parentDiv.style.position = 'relative';

            parentDiv.appendChild(div)
            context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
            context.marker.setContent(parentDiv)
        },
},

```
![Image text](https://github.com/Garvolll/storyMap/raw/master/src/assets/2.png)
![Image text](https://github.com/Garvolll/storyMap/raw/master/src/assets/1.png)
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
