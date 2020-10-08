const Coupon = require('../../model/coupons/coupon');
const bcrypt = require('bcryptjs');
const ExistUser = require('../../model/users/existUser')



/**Add Coupons  */
exports.addCopouns = async (req, res) =>{

    const {email, coupon_id } = req.body


    try {
 
        // const currentDate = new Date().toISOString();
        // var myDate = new Date(currentDate);
      
       const iscoupon = await Coupon.find({coupon_id:coupon_id} )

       if(iscoupon.length === 0){

        return res.status(404).json({msg:"Invalid Coupon ID"})
       }



    //    const user = ExistUser.findById({_id:iscoupon.user})

    //    if(!user) { return res.status(401).json({msg:"Your invalid user"})}

    //      user.balance =   user.balance + iscoupon.amt


//         const coupon = await Coupon.aggregate([

//             {
//               $match: {coupon_id:req.body.coupon_id}  
//             },
//             {
//                 $project: {
                    
//                     diffrencetime:{$divide : [{$subtract: [myDate, "$createdAt"]}, 3600000]},
//                     expiry_date: 1
//                  }
//             }
//         ])

//    let valid_time =  (coupon[0].expiry_date - coupon[0].diffrencetime)

//    if(valid_time > 0) {

//    return res.status(201).json({msg:"succefully added"})

//    } 
  
    res.status(401).json({msg:iscoupon})
        
    } catch (error) {
        res.status(400).json({msg:"Something Went Wrong !"})


    }

}


exports.createPassword = async (req, res) =>{

    const {email, password, confirm_password,} = req.body


try {

    if(password !== confirm_password ){

        return res.status(401).json("password is not matched")
 
 }

 const user = await ExistUser.findOne({email:email});

 if(!user) { return res.status(401).json({msg:"Your not Valid User"})}

 if(user.issued === true ){

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password,salt) 

    await user.save();

    const token={
                    user:{

                         id:user._id
                         }
                 }


    jwt.sign(token, 

            config.get('jwtSecret'),{

                 expiresIn:360000

 }, (err, token) => {

        if(err) throw err

         res.json({token})

 })




 }

    res.status(201).json({msg:"password Succefully created", token})
    
} catch (error) {

    res.status(401).json({msg:"Somthing went Wrong !"})
    
}


}