import mongoose from 'mongoose';

const connectDb=async ()=>{
try {
    // console.log("ready state before connection",mongoose.connection.readyState)
    if(mongoose.connection.readyState === 1){
        console.log('DB already connected')
        return
    }
    await mongoose.connect(process.env.MONGODB_PROD_URI,{
        dbName:'todoAppV2'
    })
    //   console.log("ready state after connection",mongoose.connection.readyState)
    console.log('DB connected')
} catch (error) {
    console.log(error);
    console.log('DB connection Failed')
    process.exit(1)
    
}
}


// const db= mongoose.connection.db;
// mongoose.model('Todo',{})

export default connectDb;