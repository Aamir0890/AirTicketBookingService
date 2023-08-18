const express=require('express')

const{ BookingController }=require('../../controller/index')

const router=express.Router();


const bookingController=new BookingController();


router.get('/info',(req,res)=>{
    return res.json({message:"Response from routers"})
})
router.post('/booking',bookingController.create);


module.exports=router