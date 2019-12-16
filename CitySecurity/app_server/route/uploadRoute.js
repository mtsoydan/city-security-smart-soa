var express=require('express');
var router=express.Router();
var ctrlUp=require('../controller/uploadController');

router.get('/',ctrlUp.monUp);
router.post('/',ctrlUp.monPost);
module.exports=router;