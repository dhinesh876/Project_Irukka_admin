import cors from "cors";
import express from "express";
import { errorhandler } from "./src/middleware/errormiddleware.js";
import { serverlog } from './src/middleware/logger.js';
import { shoprouter } from "./src/routes/shoproutes.js";
import { routeerrorResponse } from "./src/utils/response.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(serverlog);

app.use(cors());

//Routes 
app.use('/api',shoprouter); // or app.use(shoprouter); use for all routes without prefix

//404 Error handling
app.use((req, res, next) => {
   routeerrorResponse(res, 404, "PAGE NOT FOUND");
});

//Error middleware
app.use(errorhandler);

//Start the server "use laptop ip and connect -> http://1**.**.**.**:3000/api/getdata"
app.listen(PORT, "0.0.0.0",() => {
    console.log(`Server is running on port ${PORT}`);
});