
const {Booking}=require('../models/index');
const { ValidationError, AppError } = require('../utils/index');
const {StatusCodes}=require('http-status-codes')
class BookingRepository{
  async create(data){
    try{
         const booking =await Booking.create(data);
        return booking;
    }catch(error){
        if(error.name==='SequelizeValidationError'){
            throw new ValidationError(error)
        }
        throw new AppError(
        'Repository Error',
        'Cannot create Booking',
        'There was some server issue in repository layer',
        StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

 
}



module.exports=BookingRepository;