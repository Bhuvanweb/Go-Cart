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
    }
}