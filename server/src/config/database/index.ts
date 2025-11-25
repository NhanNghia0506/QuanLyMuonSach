import mongoose from "mongoose"

async function connect() {
    try{
        await mongoose.connect('mongodb://localhost:27017/QuanLyMuonSach');
        console.log('Connect successfully')
    }catch(error: any) {
        console.log(error.message)
    }
}

export default connect;