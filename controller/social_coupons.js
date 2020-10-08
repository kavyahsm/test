const SocialCoupons = require('../model/social_coupons')

exports.addsocialcoupons = async(req, res) => {
    try {
        const socialcoupon = new SocialCoupons(req.body)
        await socialcoupon.save()
        res.send({ socialcoupon })

    } catch (error) {
        res.status(401).json({ err: "Somthing Went Wrong !", error })
    }

}


exports.deletesocialcoupons = async(req, res) => {
    try {

        const deletecoupon = await SocialCoupons.deleteOne({ _id: req.params.id })
        res.json({ message: "deleted sucessfully", deletecoupon })

    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }


}

exports.updatesocialcoupons = async(req, res) => {

    try {
        const updatecoupon = await SocialCoupons.updateOne({ _id: req.params.id }, req.body)
        res.json({ message: "update sucessfully", updatecoupon })
    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }
}

exports.getsocialcoupons = async(req, res) => {

    try {
        const getcoupon = await SocialCoupons.aggregate([

            {
                $group: {
                    _id: "$category",

                    coupons: {
                        $push: {
                            _id: "$_id",
                            value: "$value",
                            cashback: "$cashback",
                            effective_price: "$effective_price",
                            validity: "$validity",
                            details: "$details"
                        }
                    },
                }
            }, {
                $project: {

                    coupon_name: "$_id",
                    coupons: 1,
                    _id: 0
                }
            }
        ])

        res.json({ message: "update sucessfully", getcoupon })
    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }
}