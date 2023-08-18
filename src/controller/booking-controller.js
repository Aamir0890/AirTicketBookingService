const {BookingService}=require('../services/index')
const {StatusCodes}=require('http-status-codes')
const {createChannel,publishMessage}=require('../utils/messageQueue')
const {REMINDER_BINDING_KEY}=require('../config/serverConfig')
const BooingService=new BookingService();

class BookingController{

    constructor(){
       
    }
    
    async sendMessageToQueue(req,res){
   const channel=await createChannel();
   const payload={
    data:{
    subject:'This is a notifaction emial for flight',
    content:'Some queue will subscribe this',
    recepientEmail:'r60273741@gmail.com',
    notificationTime:'2023-08-15 09:49:00'
  },
  service:'CREATE_TIKCET'
  }
   publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
   return res.status(200).json({
    message:'Successfully published a message'
   })
    }

   async create (req,res){
    try{
const response=await BooingService.createBooking(req.body);

return res.status(StatusCodes.OK).json({
  message:'Successfully submitted a booking',
  data:response,
  success:true,
  err:{}
})
    }catch(error){
      
      res.status(error.statusCodes).json({
          message:error.message,
          data:{},
          success:false,
          err:error.explanation
    })
}
}
}


module.exports=BookingController