export class ApiError extends Error {
    public success: boolean;
    public statusCode: number;
    public message: string;
    public stackTrace?: any;
    public data?: any;

    constructor(
        statusCode: number,
        message: string,
        stackTrace?: string,
        data?: any
    ){
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        
        // Showing stack trace only in dev environment
        if(process.env.NODE_ENV === "development"){
            if (stackTrace) {
                this.stackTrace = stackTrace;
            } 
            else{
                Error.captureStackTrace(this, this.constructor);
            }
        }
    }
}