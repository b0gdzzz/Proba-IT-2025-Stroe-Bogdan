import mongoose from "mongoose";

const grillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null // Optional - for bonus feature
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        trim: true
    }
},
{
    timestamps: true
});

const Grill = mongoose.model("Grill", grillSchema);

export default Grill;
