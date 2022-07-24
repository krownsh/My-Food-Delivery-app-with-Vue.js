var express = require('express');
var port = 8088;

var app = express();

var router = express.Router();
router.get('/', function(req,res,next){
	req.url = '/index.html';
	next();
});

app.use(router);



// 獲取數據
var goods = require('./data/星巴克(店家菜單).json');
var ratings = require('./data/星巴克(店家評價).json');
var seller = require('./data/星巴克(店家資訊).json');

// 2、路由
var routes = express.Router();

// 3、街口
routes.get('/goods', (req,res) => {
	// 返回json
	res.json(goods);
});
routes.get('/ratings', (req,res) => {
	// 返回json
	res.json(ratings);
});

routes.get('/seller', (req,res) => {
	// 返回json
	res.json(seller);
});

// 4、
app.use('/api',routes);


// 定義static目錄，指向./dist目錄
app.use(express.static('./dist'));


// 啟動express
module.express = app.listen(port, function(err){
	if(err){
		console.log(err);
		return;
	}
	
	console.log('http://localhost:' + port + '\n');
});
