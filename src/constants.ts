// Constant variables
const DB_name: string = "Production";
const default_secret: string = "Er*}?=jA+}2,aQ=uX*+_WF8GFuUp5_SVM#PR+EeH}WW%F$}A&=";
const default_avatar_url: string = 'http://res.cloudinary.com/dyadl5sna/image/upload/v1727098885/profile_image.jpg';

// Enums
enum StatusCodes {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE = 422,
    INTERNAL_SERVER_ERROR = 500
};

export {
    DB_name,
    default_secret,
    StatusCodes,
    default_avatar_url
}