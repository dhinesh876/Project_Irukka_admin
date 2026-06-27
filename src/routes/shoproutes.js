import express from "express";
import { adminaprove, closeshopstatus, deletecomment, getData, updateshopstatus } from "../controllers/shopcontrollers.js";

// Create a new router instance
export const shoprouter = express.Router();

// Define the route for getting data
shoprouter.get('/getdata', getData);

// Define the route for deleting shop data
// shoprouter.get('/deleteshop/:id', deleteshop);

// Define the route for admin approval
shoprouter.put('/adminaprove', adminaprove);

// Define the route for Deleting a comment
shoprouter.delete('/deletecomment',deletecomment);

// Define the route for updating for all Shop auto close
shoprouter.put('/closeallshop', updateshopstatus);

//Define the route for updating for selected shop close
shoprouter.put('/shopclose', closeshopstatus);