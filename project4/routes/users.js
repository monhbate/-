var express = require('express');
var router = express.Router();
var model=require('../model/index.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册接口
router.post('/regist', function(req, res, next) {
  var data={
	username:req.body.username,
	password:req.body.password,
	password2:req.body.password2,
  }
  //注册校验
  model.connect(function(db){
	  db.collection('users').insertOne(data,function(err,ret){
		if(err){
			console.log('注册失败')
			res.redirect('/regist')
		}else{
			res.redirect('/login')
		}
	  })
  })
  //res.send(data);
})

//登录接口
router.post('/login', function(req, res, next) {
  var data={
	username:req.body.username,
	password:req.body.password
  }
  model.connect(function(db){
	db.collection('users').find(data).toArray(function(err,docs){
		if(err){
			res.redirect('/login')
		}else{
			
			if(docs.length > 0){
				//登录成功,进行session会话
				req.session.username=data.username
				res.redirect('/')
			}else{
				res.redirect('/login')
			}
		}
		
	})
  })
})

module.exports = router;
