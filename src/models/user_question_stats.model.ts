import mongoose, { Schema , Document, ObjectId } from 'mongoose';

export interface user_question_stats extends Document {
    user_id : ObjectId;         // refers to UserModel's _id
    question_id : ObjectId;     // refers to QuestionsModel's _id
    qInterval : Date;           // date when we can ask the question again
    interval_factor : number;
    canAsk : boolean;
    createdAt? : Date;
    updatedAt? : Date;
}

const User_Question_Schema : Schema<user_question_stats> = new Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true 
    },
    question_id : {
        type : Schema.Types.ObjectId,
        ref : 'Question',
        required : true
    },
    qInterval : {
        type : Date,
        required: true,
    },
    interval_factor : {
        type : Number,
        required : true
    },
    canAsk : {
        type : Boolean,
        required : true
    }
})

const User_Question_Model = mongoose.model<user_question_stats>("User_Question", User_Question_Schema);
export default User_Question_Model