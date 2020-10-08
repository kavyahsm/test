const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const User = require('../../model/users/user');

exports.register = async(req, res) => {

    const { user_name, password, confirm_password, phone_number, } = req.body

    try {

        if (password !== confirm_password) {

            return res.status(401).json("password is not matched")

        }




        const user = new User({


            user_name,
            password,
            phone_number

        })



        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save();

        const token = {
            user: {

                id: user._id
            }
        }


        jwt.sign(token,

            config.get('jwtSecret'), {

                expiresIn: 360000

            }, (err, token) => {

                if (err) throw err

                res.json({ token })

            })



    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }

}




exports.login = async(req, res) => {


    try {

        const user = await User.findOne({ user_name: req.body.user_name })

        if (!user) {

            return res.status(400).json({ msg: 'invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, User.password)

        if (!isMatch) {

            res.status(400).json({ msg: 'invalid credentials' })
        }


        const token = {
            user: {

                id: user._id
            }
        }


        jwt.sign(token,

            config.get('jwtSecret'), {

                expiresIn: 360000

            }, (err, token) => {

                if (err) throw err

                return res.json({ token })

            })





    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }

}




exports.getAllUser = async(req, res) => {

    try {

        const users = await User.find({})


        res.status(201).json({ msg: "Succefully", users })

    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }

}



exports.getCurrentUser = async(req, res) => {

    try {



        res.status(201).json({ msg: "Succefully", user: req.user })

    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }

}


exports.updateUser = async(req, res) => {

    try {

        const user = await User.updateOne({ _id: req.params.id }, req.body)
        res.status(201).json({ msg: "update Succefully", user })

    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }

}

exports.deleteUser = async(req, res) => {

    try {

        const user = await User.deleteOne({ _id: req.params.id })
        res.status(201).json({ msg: "deleted Succefully", user })

    } catch (error) {

        res.status(401).json({ err: "Somthing Went Wrong !", error })

    }

}



exports.isAuthenticate = async(req, res, next) => {

    const token = req.header('x-auth-token')

    if (!token) {

        return res.status(401).json({ msg: 'no token,authorization denied' })
    }

    try {

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()

    } catch (err) {

        return res.status(401).json({ msg: 'token is not valid' })
    }


}