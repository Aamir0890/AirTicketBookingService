const express=require('express')

const{ BookingController }=require('../../controller/index')

const router=express.Router();


const bookingController=new BookingController();

router.post('/booking',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue)
module.exports=router