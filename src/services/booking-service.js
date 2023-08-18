const {BookingRepository}=require('../repository/index')
const axios=require('axios');
const {createChannel,publishMessage}=require('../utils/messageQueue')
const {FLIGHT_SERVICE_PATH,USER_DEV}=require('../config/serverConfig');
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
            const MailId=data.userId;
            const getMail=`${USER_DEV}/api/v1/getById/:${MailId}`  
            const userMail=await axios.get(getMail);
            const Maildata=userMail.data.data;
            const mail=Maildata.email
            this.sendMail(mail);
            return finalBooking;
             
        }catch(error){
            if(error.name==='Repository Error'|| error.name==='Validation Error'){
                throw error;
            }
            throw new ServiceError();
        }
       

    }
    async sendMail(data){
        try{
            const channel=await createChannel();
            const payload={
             data:{
             subject:'This is a notifaction emial for flight',
             content:'Congratas,Yur flight has been booked',
             recepientEmail:data,
             notificationTime:'2023-08-15 09:49:00'
           },
           service:'CREATE_TIKCET'
           }
            publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
            console.log("Message deliverd successfully")

        }catch(error){
            console.log(error)
        }
    }
}

module.exports=BooingService