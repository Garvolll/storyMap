/*  依赖
*   faker
*   express
*   nodemon
*/

var express = require("express");
var app = express();            //利用express起一个服务器，命名app
var faker = require('faker');  //引入faker.js
faker.locale = "zh_CN";

function getRandom(min, max) {
    return ~~(Math.random() * (max - min + 1) + min);
}
app.all("*", function(req, res, next) {     //  上边启动的服务器监听到的所有的请求都会根据这里的配置加上header请求头，可以直接复制
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    setTimeout(next,1000)
    //next();
});

/******以下的内容需要自己模仿配置，根据自己的业务逻辑添加或修改对应的接口就行了********/

app.get("/api/memoir", function(req, res) {     //一般的获取list接口,返回的是数组

    var query = req.query,      //query是url后边的querystring转化后的对象  
        /*                              query={
        *     /api/memoir?size=10   =>    size:10
        *                               }
        */
        result = {      //返回的json内容的配置，有其他返回的内容可以自己设置
            code: 200,
            success: true,
            list: []    
        },
        length = query.size || 10;
    if ( query.index == 7 ){
        length = 7;         
    }
    for (var i = 0; i < length; i++) {      //  利用for循环将result.list数组填充进数据
        var width = 285,
            height = getRandom(150,450);
        result.list.push({                  //Faker.js 文档 https://github.com/marak/Faker.js/
            id: faker.finance.account(),    //调用的是faker提供的方法，不同的方法可以生成不同的随机的假数据，例如lorem对应的生成乱文的方法，image对应生成随机图片的方法
            type: ["img", "record", "audio", "video"][~~(Math.random() * 4)],
            title: faker.lorem.text(),        
            image: faker.image.image(width,height),
            date: +faker.date.past(),       
            desc: faker.lorem.paragraph(),  
            totalTime: faker.random.number(),
            avatar: faker.image.imageUrl(140,140),
            name: faker.name.findName(),
            eventNumber: faker.random.number(),
            ptotoNumber: faker.random.number(),
            width: width,
            height: height,
            ptotoList: [
                faker.image.imageUrl(80,80),
                faker.image.imageUrl(80,80),
                faker.image.imageUrl(80,80)
            ]
        })
    }
    res.send(result);           //将造假过后的result对象作为返回的json返回
});
app.get("/api/memoir/:id", function(req, res) {         //一般情况的详情接口,调用的url类似:/api/memoir/12344  (12345就是id)
    var query = req.query,
        result = {          
            code: 200,
            success: true,
            data: {}
        };
    var width = 285,
        height = getRandom(150,450);
    result.data = {
        id: query.id,
        type: ["img", "record", "audio", "video"][~~(Math.random() * 4)],
        title: faker.lorem.words(),
        image: faker.image.image(width,height),
        date: +new Date,
        desc: query.text,
        content: query.text,
        totalTime: faker.random.number(),
        avatar: faker.image.imageUrl(140,140),
        name: faker.name.findName(),
        eventNumber: faker.random.number(),
        ptotoNumber: faker.random.number(),
        familyNumber : faker.random.number(),
        width: width,
        height: height,
        province:faker.address.state(),
        city:faker.address.city(),
        likeNum:faker.random.number(),
        readNum:faker.random.number(),
        sex : getRandom(0,1),
        ptotoList: [
            faker.image.imageUrl(80,80),
            faker.image.imageUrl(80,80),
            faker.image.imageUrl(80,80)
        ]
    }
    res.send(result);
});
/***************************/
var server = app.listen(8888, function() { //需要用命令行再启动一个服务监听一个端口(这里是8888),package.json配置指定的命令类似npm run mock
    var host = server.address().address;
    var port = server.address().port;
    console.log("Mock server listening at http://%s:%s", host, port);
});
