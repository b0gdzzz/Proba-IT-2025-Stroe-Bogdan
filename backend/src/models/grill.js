import mongoose from "mongoose";

const grillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const Grill = mongoose.model("Grill", grillSchema);

export default Grill;
