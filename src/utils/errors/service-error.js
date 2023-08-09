
const {StatusCodes}=require('http-status-codes')

class ServiceError extends Error{
    constructor(message='Somethign went wrong',
        explanation='Service layer error',
        statusCodes=StatusCodes.INTERNAL_SERVER_ERROR
        ){
            super();
            this.name='Service Error',
            this.message=message,
            this.explanation=explanation,
            this.statusCodes=statusCodes
        }

}

module.exports=ServiceError;