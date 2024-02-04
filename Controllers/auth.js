import { Users } from '../Modals/users.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

// Register new user 
export const register = async (request, response) => {

    try {

        const { username, email, password } = request.body

        if ( await Users.findOne({username}) ) {
            response.json({
                success: false,
                message: "Username already existed."
            })
        } else {

            const hashPassword = await bcrypt.hash(password, 10)
            
            await Users.create({username, email, password: hashPassword})
    
            response.json({
                success: true,
                message: "User created successfully."
            })
        }
        
    } catch (error) {

        console.log(error)

    }

}

// Login User
export const login = async (request, response) => {

    try {

        const { username, password } = request.body 
        
        const user = await Users.findOne({username}).select("+password")

        if( user && await bcrypt.compare(password, user.password) ) {

            const token = jsonwebtoken.sign({_id: user._id}, process.env.JWT_PRIVATE_KEY, {expiresIn:"1h"})

            response.json({
                success: true,
                token
            })

        } else {
            response.json({
                success: false,
                message: "User not found"
            })
        }

    } catch (error) {

        console.log(error)

    }

}

// Logout User
export const logout = async (request, response) => {

    try {

        response.json({
            success: true,
            message: "User logout successfully."
        })                                                  

    } catch (error) {

        console.log(error)

    }

}