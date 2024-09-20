// const brcypt = require('bcryptjs')
const { name } = require('body-parser');
const models = require('../models')



const addFee = async (req, res) => {
    try {
        // Check if the user already exists
        const checkUser = await models.User.findOne({ where: { email: req.body.email } });

        if (checkUser) {
            return res.status(409).send({ result: checkUser, message: 'Email already registered' });
        }

        // Create new user
        const user = {
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            phoneNo: req.body.phoneNo,
            profile: req.body.profile,
            password: req.body.password,
        };

        const newUser = await models.User.create(user);
        res.status(201).send({ message: "User signed up successfully", result: newUser, });
    } catch (err) {
        res.status(500).send({ message: "An error occurred while signing up", result: err.message, });
    }
}



const getMemberFees = async (req, res) => {
    console.log(req.body.email);
    const checkUser = await models.User.findOne({ email: req.body.email })
    if (checkUser) {
        // res.status(200).send({result:checkUser,message:'Login Successfully'});
        // var checkPass = await brcypt.compare(req.body.password,checkUser.password)
        // res.send(checkPass) ///Pass true and false
        if (req.body.password == checkUser.password) {
            res.status(200).send({ message: "Your are sign in successfully", result: checkUser, })
        } else {
            res.status(400).send({ message: "Your Password is incorrect", })
        }
    } else {
        res.status(400).send({ message: 'Not User is registered with this Email', });
    }
}

const deleteFee = async (req, res) => {
    try {
        // Find and delete the user by ID
        const userId = req.params._id; // or req.body._id if coming from request body
        const result = await models.User.destroy({
            where: { id: userId }
        });

        if (result === 1) {
            res.status(200).send({ message: 'Deleted Successfully' });
        } else {
            res.status(404).send({ message: 'Account not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while deleting the account', result: error });
    }
}


module.exports = {
    addFee: addFee,
    getMemberFees: getMemberFees,
    deleteFee: deleteFee,
}