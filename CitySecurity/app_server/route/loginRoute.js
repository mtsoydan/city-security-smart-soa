var express =require('express');
var router=express.Router();
var ctlLogin=require('../controller/loginController');


router.get('/',ctlLogin.indexGet);
router.post('/',ctlLogin.indexPost);


module.exports=router; //farklı yerden kullanılabilir - sınıf mantığı