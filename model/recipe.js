const mongoose=require("mongoose")
const schema =mongoose.Schema(
    {
        "rName":{type:String,required:true},
        "decription":{type:String,required:true},
        "image":{type:String,required:true}
    }
)
const recipeModel=mongoose.model("recipes",schema)
module.exports={recipeModel}