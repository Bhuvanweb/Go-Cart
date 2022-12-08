var db=require('../config/connection')
var collection=require('../config/collections')
const ObjectId=require('mongodb').ObjectId

module.exports={
    addProduct:(product,cb)=>{
        db.get().collection('product').insertOne(product).then((response)=>{
            cb(response.insertedId)
        })
    },
    getAllProducts:()=>{
        return new Promise((resolve,reject)=>{
            let products=db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProducts:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:ObjectId(proId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getProducts:(proId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:ObjectId(proId)},
            {$set:{
                Name:proDetails.Name,
                Category:proDetails.Category,
                Description:proDetails.Description,
                Price:proDetails.Price
            }}).then((response)=>{
                resolve()
            })
        })
    },
    getCartCount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cart=await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            let count=0
            if(cart){
                count=cart.products.length
            }
            resolve(count)
        })
    }
}