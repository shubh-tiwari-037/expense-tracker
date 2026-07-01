import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {

    app.listen(PORT, () => {

        console.log(`Server Running on Port ${PORT}`);

    });

})
.catch((error) => {

    console.log(error);

});