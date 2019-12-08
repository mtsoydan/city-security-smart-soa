var express=require('express');
var router=express.Router();
var ctrlHome=require('../controller/homeController');

router.get('/',ctrlHome.index);
module.exports=router;