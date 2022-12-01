var db = require("../config/connection");
var collection = require("../config/collections");
var bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.Password = await bcrypt.hash(userData.Password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data.insertedId);
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ Email: userData.Email });
      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((status) => {
          if (status) {
            console.log(`Login success`);
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log(`Login failed`);
            resolve({ status: false });
          }
        });
      } else {
        console.log(`Login failed`);
        resolve({ status: false });
      }
    });
  },
  addToCart: (proId, userId) => {
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .findOne({ user: ObjectId(userId) });
      if (userCart) {
        db
        .get()
        .collection(collection.CART_COLLECTION)
        .updateOne({user:ObjectId(userId)},{
                $push:{products:ObjectId(proId)}
        }).then((response)=>{
            resolve()
        })
      } else {
        let cartObj = {
          user: ObjectId(userId),
          products: [ObjectId(proId)],
        };
        console.log(`cartObj: ${cartObj}`);
        db.get()
          .collection(collection.CART_COLLECTION)
          .insertOne(cartObj)
          .then((response) => {
            resolve();
          });
        // console.log(cartObj);
      }
    });
  },
  getCartProducts:(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([
        {$match:{user:ObjectId(userId)}},
        {$lookup:
          {from:collection.PRODUCT_COLLECTION,
          let:{proList:"$products"},
          pipeline:[
            {$match:{
              $expr:{
                $in:["$_id","$$proList"]
              }
            }}
          ],
          as:'cartItems'
        }}
      ]).toArray()
      resolve(cartItems[0].cartItems)
    })
  }
};
