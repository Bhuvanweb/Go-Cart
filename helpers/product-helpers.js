var db=require('../config/connection')

module.exports={
    addProduct:(product,cb)=>{
        db.get().collection('product').insertOne(product).then((response)=>{
            cb(response.insertedId)
        })
    }
}