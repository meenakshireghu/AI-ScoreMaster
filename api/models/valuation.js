import mongoose from 'mongoose';

const valuationSchema = new mongoose.Schema({
    valuatorId: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    answerSheet: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Valuation = mongoose.model('Valuation', valuationSchema);

export default Valuation;
