export class ApiResponse<T> {
    public success: boolean;
    public statusCode: number;
    public message: string;
    public data?: T;

    constructor(
        success: boolean = true, 
        statusCode: number = 200, 
        message: string, 
        data?: T
    ) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}