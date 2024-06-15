const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const bcryptjs=require("bcryptjs")


const users=require("./model/user")
const {userModel}=require("./model/user")
 
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://orwel000:orwel123@cluster0.hyugd.mongodb.net/recipeDB?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword=async(password)=>{
    const salt=await bcryptjs.genSalt(10)
    return bcryptjs.hash(password,salt)

}

app.post("/signup",async(req,res)=>{
    let input=req.body
    // console.log(input)
    let hashedPassword=await generateHashedPassword(input.password)
    input.password=hashedPassword
    let user=new userModel(input)
    // console.log(user)

    user.save()
    res.json({"status":"success"})
})






app.listen(8080,()=>{
    console.log("server started")
})
