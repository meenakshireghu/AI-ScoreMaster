import mongoose from 'mongoose';

const valuatorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questionPaper: {
        type: String,
        required: true,
    },
    answerKey: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Valuator = mongoose.model('Valuator', valuatorSchema);

export default Valuator;
