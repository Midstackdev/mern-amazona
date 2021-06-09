import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    numReviews: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model('Product', productSchema)