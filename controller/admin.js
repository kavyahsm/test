const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin=require('../model/admin/admin')

exports.register = async (req,res) =>{

    const {admin_name,password,confirm_password,} = req.body

    try {
   
        if(password !== confirm_password ){

            return res.status(401).json("password is not matched")
     
     }



    
const admin = new Admin({

    admin_name,
    password,
 

})
    


const salt = await bcrypt.genSalt(10)
admin.password = await bcrypt.hash(password,salt) 

   await admin.save();


res.status(201).json({msg:"Register Succefully", admin})
        
    } catch (error) {

        res.status(401).json({err:"Somthing Went Wrong !",error})
        
    }

}


exports.getAdmin = async (req,res)=>{

    try {
        
        const admin=await Admin.find({})
    
    
        res.status(201).json({msg:"Succefully", admin})
    
    } catch (error) {
    
                res.status(401).json({err:"Somthing Went Wrong !",error})
    
    }
    
    }

    exports.updateAdmin = async (req,res)=>{
        try{

            const admin = await Admin.updateOne({_id:req.params.id}, req.body)
            res.status(201).json({msg:"update Succefully", admin})

        }catch(error){
         
            res.status(401).json({err:"Somthing Went Wrong !",error})

        }

    }




    exports.deleteAdmin = async (req,res)=>{

        try {
            
            const admin = await Admin.deleteOne({_id:req.params.id})
            res.status(201).json({msg:"deleted Succefully",admin})
        
        } catch (error) {
        
                    res.status(401).json({err:"Somthing Went Wrong !",error})
        
        }
        
        }




