const Coupon = require('../model/coupons/coupon');
const short = require('short-uuid');
const ExistUser = require('../model/users/existUser')
const xlsx = require('xlsx')
/**Generate Coupons */
exports.genrateCoupon = async (req, res)=>{

    // let numberGen = req.body.numberOfGenrate


    let  getRandomCoupon = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
     }

     
     let timestamp = new Date().getTime()

     let generateCoupon = (length) =>{

        var ts = timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";

        for( var i = 0; i < length; ++i ) {
            var index = getRandomCoupon( 0, parts.length - 1 );
            id += parts[index];	 
         }

       return parseInt(id);
     }


    try {

      
        
        for(var i = 0; i < req.body.number_gen; i++)
        {

            const coupon = new Coupon({
               
                coupon_id:generateCoupon(16),
                cvv:generateCoupon(4),
                expiry_date:req.body.expiry_date
    
            })

            await coupon.save()


        }
// const coupon = await Coupon.find()
        res.status(201).json({msg:"coupon"})
     

    } catch (error) {

        res.status(401).json({msg:error})

        
    }



}



/**isued handler */
exports.issuedHandler = async (req, res)=>{

    try {

// const coupon = Coupon.find({})

   await  Coupon.updateMany({
            _id:
            {
                $in:req.body.ids
            }
        },
        
    {
        $set: { issued: true }

    })

    res.status(201).json({msg:"Coupon Succefully issued !"})

    } catch (error) {
        
        res.status(401).json({msg:"Somthing Went Wrong !"})
    }
}





/**assign coupons by exel for user */

exports.assignCouponbyexel = async (req, res) =>{

    let wb =  xlsx.readFile('sycamore.xlsx')
    let ws = wb.Sheets['Sheet1'];
    let data = xlsx.utils.sheet_to_json(ws);


try {

    data.map(async (item) =>{

const coupon = await Coupon.findOne({coupon_id:item.coupon_id})

if(!coupon || !coupon.issued) { return null }

const isuser = await ExistUser.findOne({user_name:item.user_name}).populate('coupons', 'coupon_id').exec()
if(isuser.email === item.email ) { return null }


if(isuser && coupon.user.length > 0){
  

  const isrepeat = isuser.coupons.some(isrepeat_id =>{

        return isrepeat_id.coupon_id === item.coupon_id

    })
    

   if(isrepeat){ return null }

          await isuser.coupons.push(coupon);
          return  await isuser.save();
    
} 



    const user = new ExistUser({
        user_name:item.user_name,
        email:item.email,
    
    });

    await user.coupons.push(coupon);
    user.balance = user.balance + item.amount
    await user.save();
    coupon.user = user;   
    coupon.amount = item.amount 
    coupon.isactive = item.isactive 
    await coupon.save();


    } )

 
    
    res.status(201).json({msg:`Succefully Coupon Asigned `})

  
} catch (error) {
    
    res.status(401).json({msg:"Somthing went Wrong !"})
}
   

}


//****asign coupns by manuel */
exports.assignCouponbymanuel = async (req, res) =>{

    const {coupon_id, email, user_name, amount, isactive} = req.body

try {

    const coupon = await Coupon.findOne({coupon_id:coupon_id})

    if(!coupon) { return res.status(401).json({msg:"Invalid Coupon!"}) }

    const isuser = await ExistUser.findOne({user_name:user_name}).populate('coupons', 'coupon_id').exec()
    
    if(coupon.issued === false ) { return res.status(401).json({msg:"this coupon is not issued !"}) }

   
    if(isuser && coupon.user.length > 0){
      
    
      const isrepeat = isuser.coupons.some(isrepeat_id =>{
    
            return isrepeat_id.coupon_id === coupon_id
    
        })
        
    
       if(isrepeat){ return res.status(401).json({msg:"This coupon is already asigned !"}) }
    
              await isuser.coupons.push(coupon);
              return  await isuser.save();
        
    } 
    
    
    
        const user = new ExistUser({
            user_name:user_name,
            email:email,
        
           
        });

        const isemaillexist = await ExistUser.findOne({email:user.email})

        if(isemaillexist ) { return res.status(401).json({msg:"this Email is already Exist !"}) }

    
        await user.coupons.push(coupon);
        user.balance = user.balance + amount

        await user.save();
        coupon.user = user;   
        coupon.amount = amount 
        coupon.isactive = isactive
        await coupon.save();
    
        res.status(201).json({msg:`Succefully Coupon Asigned `})


} catch (error) {
    
    res.status(401).json({msg:"Somthing went Wrong !", error})


}


}