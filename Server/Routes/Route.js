import Router from 'express'
import { Signup,Login } from '../Controller/Authcontroler.js'
import AuthenticateToken from '../Midlewere/AuthenticateToken.js'

const authRoutes=Router()

authRoutes.post('/signup',Signup)
authRoutes.post('/login',AuthenticateToken,Login)


export default authRoutes;