// mongodb+srv://mohdayazbhati88:<password>@merndatabase.zwvrsfu.mongodb.net/

import { connect } from "mongoose";

const connectToMongo = async () => {
    try {
        await connect('mongodb+srv://mohdayazbhati88:Ayaz_200300@merndatabase.zwvrsfu.mongodb.net/eNotebook');
        console.log("---***Database Connected Successfully***---")
    } catch (error) {
        console.log(error);
    }
}

export default  connectToMongo;