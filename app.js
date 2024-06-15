const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")


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

app.post("/signin",(req,res)=>{
    let input=req.body
   // console.log(input)
   userModel.find({"email":input.email}).then(
    (response)=>{
       // res.json(response)
       if (response.length>0) {
        // res.json(response)
        let dbPassword=response[0].password
        bcryptjs.compare(input.password,dbPassword,(error,isMatch)=>{
            if (isMatch) {
                //res.json({"status":"success"})
                jwt.sign({email:input.email},"recipeapp",{expiresIn:"1d"},
                (error,token)=>{
                    if (error) {
                        res.json({"status":"unable to create token"})
                    } else {
                        res.json({"status":"success","userId":response[0]._id,"token":token})
                    }
                })
            } else {
                res.json({"status":"incorrect password"})
            }
        })
       } else {
        res.json({"status":"user not found"})
       }

    }
   ).catch()
   // res.json({"status":"success"})
})





app.listen(8080,()=>{
    console.log("server started")
})
