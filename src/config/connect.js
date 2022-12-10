import mongoose from 'mongoose'
const connectDB = (url) => {
    return mongoose.connect(url, {
        // để huỷ warning khi connect mongodb
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}
export default connectDB
