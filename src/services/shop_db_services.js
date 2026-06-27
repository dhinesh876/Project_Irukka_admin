import { db } from "../config/firebase.js";

// Service function to fetch shop data from Firestore
export const fetchshopdata = async() => {

  //get all shops from firestore and return the data along with reviews in an array of objects
      const snapshot = await db.collection('shops').get();

      // Use Promise.all to wait for all asynchronous operations to complete
      const shops =  await Promise.all(
        snapshot.docs.map(async (shopdoc) => {
 
          // Fetch the reviews for each shop document
          const shopreview = await shopdoc.ref.collection('reviews').get();

          // Return the shop data along with its reviews
          const shopdata = shopdoc.data();

          // Return the shop image base64 into normal image
          shopdata.imageBase64 = `data:image/jpeg;base64,${shopdata.imageBase64}`

        return {
            ownerId: shopdoc.id,
            shopname: shopdata.shopName,
            ownername : shopdata.ownerName,
            category: shopdata.category,
            location: shopdata.location,
            phone: shopdata.phone,
            admin: shopdata.admin,
            image : shopdata.imageBase64,
            hours : shopdata.hours,
            isOpen : shopdata.isOpen,

            // Map the reviews to an array of objects containing userId, author, and comment
            reviews: shopreview.docs.map((reviewDoc) => {
                  const reviewdata = reviewDoc.data();

                  // Return an object containing the userId, author, and comment for each review
                  return {
                       userId : reviewdata.userId,
                       author : reviewdata.author,
                       comment : reviewdata.comment,
                       stars: reviewdata.starts
                  }
            })
        };
      }));

      return shops;
};

// Service function to delete shop data from Firestore
export const deleteshopdata = async(id) => {
   const snapshot = await db.collection('shops').doc(id).delete()
}

// Service function to update admin approval status in Firestore
export const adminaprovedata = async(id, admin) => {
  const snapshot = await db.collection('shops').doc(id).update({admin: admin});
};

// Service function to Deleted a comment in Firestore
export const deletecommentdata = async(shop_id, review_id, new_comment) => {
    const snaphot = await db.collection('shops').doc(shop_id).collection('reviews').doc(review_id).delete();
};


// Service function to update all shop close in Firestore
export const updateshopstatusdata = async(isOpen) => {
  
  const snapshot = await db.collection('shops').get();

  await Promise.all(
    snapshot.docs.map(doc => {
      const data = doc.data();

      // if(data.hours !== undefined)
      // {
      //   console.log(isShopOpen(data.hours), data.hours);
      // }
      // else{}

        return doc.ref.update({
          isOpen: isOpen
        })
    })
  )
}

// Service function to update a shop close in Firestore based shop_id
export const closeshopstatusdata = async(shop_id, isOpen) => {
    const snapshot = await db.collection('shops').doc(shop_id).update({isOpen: isOpen});
};


function isShopOpen(hours) {
  const timePart = hours.split(",")[0];
  const [startStr, endStr] = timePart.split("–");

  const now = new Date();

  const parseTime = (timeStr) => {
    const date = new Date();

    const [time, modifier] = timeStr.trim().split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (modifier === "PM" && hour !== 12) hour += 12;
    if (modifier === "AM" && hour === 12) hour = 0;

    date.setHours(hour, minute, 0, 0);
    return date;
  };

  console.log(date);

  const start = parseTime(startStr);
  const end = parseTime(endStr);

  // closes after midnight
  if (end < start) {
    end.setDate(end.getDate() + 1);

    if (now < start) {
      now.setDate(now.getDate() + 1);
    }
  }

  return now >= start && now <= end;
}