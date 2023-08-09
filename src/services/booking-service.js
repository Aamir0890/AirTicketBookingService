const {BookingRepository}=require('../repository/index')
const axios=require('axios');
const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig');
const { ServiceError } = require('../utils/index');
class BooingService{
    constructor(){
        this.bookingRepository=new BookingRepository
    }
    async createBooking(data){
        try{
            const flightId=data.flightId;
            const getFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            const response=await axios.get(getFlightRequestUrl)
            const Flightdata=response.data.data;
            const priceData=Flightdata.price;
            if(data.noOfSeats>Flightdata.totalSeats){
                throw new ServiceError('Something went wrong in the booking process',
                'Insufficient Seats')
            }
            const totalCost=data.noOfSeats*priceData;
            const bookingPayload={...data,totalCost};
            const booking=await this.bookingRepository.create(bookingPayload);
               
            const updateFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
             await axios.patch(updateFlightRequestUrl,{totalSeats:Flightdata.totalSeats-booking.noOfSeats});
            const finalBooking= await this.bookingRepository.update(booking.id,{status:'Booked'})
             return finalBooking;
           
        }catch(error){
            if(error.name==='Repository Error'|| error.name==='Validation Error'){
                throw error;
            }
            throw new ServiceError();
        }
       

    }
}

module.exports=BooingService