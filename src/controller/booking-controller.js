const {BookingService}=require('../services/index')
const {StatusCodes}=require('http-status-codes')
const BooingService=new BookingService();


const create=async(req,res)=>{
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

module.exports={
    create
}