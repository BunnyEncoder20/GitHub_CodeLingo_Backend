import mongoose, { Schema , Document } from 'mongoose';

export interface Question extends Document {
    language : 'python' | 'javascript' | 'java' | 'c++';
    question : string;
    answer : string;
    explaination : string;
    tags : Array<string>;
    createdAt? : Date;
    updatedAt? : Date;
}

const QuestionSchema : Schema<Question> = new Schema({
    language : {
        type : String,
        required : [true, "All questions must belong to any one of the languages"],
        enum: ['python', 'javascript', 'java', 'c++'],
    },
    question : {
        type : String,
        required : [true, "question is obviously required"]
    },
    answer : {
        type : String,
        required : [true, "answer is obviously required"]
    },
    explaination : {
        type : String
    },
    tags : {
        type : [String],
        default : []
    }
},
{
    timestamps : true
})

const QuestionModel = mongoose.model<Question>("Question", QuestionSchema) ;
export default QuestionModel;