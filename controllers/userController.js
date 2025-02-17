const userModel = require('../models/user')

async function allUsers(req, res) {
    try {
        const user = await userModel.find()
        return res.status(200).json({ status: true, user: user.username })
    } catch (error) {
        return res.json({ status: false, error })
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params
        const password = req.body.password
        const user_type = req.body.user_type

        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ status: false, user: null })
        }

        if (password) {
            user.password = password
        }
        if (user_type) {
            user.user_type = user_type
        }

        await user.save()
        return res.status(200).json({ status: true, user, message: "updated successfully" })
    } catch (error) {
        return res.json({ status: false, error })
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params

        const user = await userModel.findByIdAndDelete(id)
        return res.status(200).json({ status: true, user, message: "User deleted successfully" })
    } catch (error) {
        return res.json({ status: false, error })
    }
}


module.exports = {
    allUsers,
    updateUser,
    deleteUser
} 