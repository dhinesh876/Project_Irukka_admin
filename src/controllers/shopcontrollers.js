import { adminaprovedata, closeshopstatusdata, deletecommentdata, deleteshopdata, fetchshopdata, updateshopstatusdata } from '../services/shop_db_services.js';
import { successResponse } from "../utils/response.js";

// Controller function to get shop data
export const getData = async(req, res, next) => {
  try{        
       const data = await fetchshopdata();
    //    console.log(data);
       
       successResponse(res, data, "Shop Data fetched successfully")

       //update data from firebase realtime database
    //    await db.collection('shops').doc('F4VLaHtwuGYyYvnHSZccOb3L1WL2').update({admin: true});
    }
    catch(err){
        console.log(err.message);
        res.status(500);
        next(err);
    }
}

// Controller function to delete shop data
export const deleteshop = async(req, res, next) => {
    try
    {
        console.log("Deleting shop with ID:", req.params.id);
        await deleteshopdata(req.params.id);
        
        // Redirect to the getdata route after deletion
        res.redirect('/api/getdata');
    }
    catch(err){
        console.log(err.message);    
         res.status(500);
         next(err);
    }
}

//additional controller function for admin approval
export const adminaprove = async(req, res, next) =>{
   try{
    const {Doc_id, admin} = req.body;

    //admin should boolen value
    await adminaprovedata(Doc_id, admin);
    successResponse(res, null, "Admin Approval updated successfully");

   }
   catch(err)
   {
    console.log(err.message);
    res.status(500);
    next(err);
   }
};

// Controller function to update a comment
export const deletecomment = async(req, res, next) => {
    try{
        const {shop_id, review_id} = req.body;
        console.log("Deleting comment for shop ID:", shop_id, "review ID:", review_id);
        
        await deletecommentdata(shop_id, review_id);
        successResponse(res, null, "Comment Deleted successfully");
    }
    catch(err){
        console.log(err.message);
        res.status(500);
        next(err);
    }
}

// Controller function to update a Shop auto Close for all
export const updateshopstatus = async(req, res, next) => {
    try{
        const {isOpen} = req.body;
        await updateshopstatusdata(isOpen);

        successResponse(res, null, "All Shop Close updated successfully");
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500);
        next(err);
    }
}

// Controller function to update a shop close using id
export const closeshopstatus = async(req, res, next) => {

    try{
        const {shop_id, isOpen} = req.body;
        await closeshopstatusdata(shop_id, isOpen);

        successResponse(res, null, "Shop Close updated successfully based on Doc ID");
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500);
        next(err);
    }

};