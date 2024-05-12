import { connect } from "mongoose";
import { disconnect } from "mongoose";
async function connectToDatabase() {
    try{
        await connect(process.env.MONGODB_URL);
    }
    catch(error){
        throw new Error("cannot connect");
    }
}

async function disconnectToDatabase() {
    try{
        await disconnect();
    }
    catch(error){
        throw new Error("cannot disconnect");
    }
}

export {connectToDatabase,disconnectToDatabase};