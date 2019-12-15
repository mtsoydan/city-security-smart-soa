var express=require('express');
var router=express.Router();
var ctrlHome=require('../controller/homeController');

router.get('/',ctrlHome.index);
router.get('/aboutUs',ctrlHome.aboutUs);
module.exports=router;