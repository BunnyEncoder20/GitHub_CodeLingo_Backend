import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface UserQuestionStats extends Document {
    user_id: ObjectId;         // refers to UserModel's _id
    question_id: ObjectId;     // refers to QuestionModel's _id
    qInterval: Date;           // date when we can ask the question again
    interval_factor: number;
    canAsk: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserQuestionSchema: Schema<UserQuestionStats> = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    qInterval: {
        type: Date,
        required: true,
    },
    interval_factor: {
        type: Number,
        required: true
    },
    canAsk: {
        type: Boolean,
        required: true,
        default: false  // You can set a default value if necessary
    }
}, {
    timestamps: true
});

const UserQuestionModel = mongoose.model<UserQuestionStats>('User_Question', UserQuestionSchema);
export default UserQuestionModel;