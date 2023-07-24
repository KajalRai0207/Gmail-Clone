import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD; 


const Connection = () => {
    const DB_URI=`mongodb://${USERNAME}:${PASSWORD}@ac-jarzun7-shard-00-00.y0pz9j0.mongodb.net:27017,ac-jarzun7-shard-00-01.y0pz9j0.mongodb.net:27017,ac-jarzun7-shard-00-02.y0pz9j0.mongodb.net:27017/?ssl=true&replicaSet=atlas-14j5r6-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        mongoose.connect(DB_URI, {useNewUrlParser:true});
        console.log("Connection established");

    }catch(error){
        console.log("Error while connecting to the database: ", error.message);
    }
}

export default Connection;