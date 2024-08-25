import Router from 'express'
import { Signup,Login,Profile} from '../Controller/Authcontroler.js'
import AuthenticateToken from '../Midlewere/AuthenticateToken.js'

const authRoutes=Router()

authRoutes.post('/signup',Signup)
authRoutes.post('/login',Login)
authRoutes.get('/profile',AuthenticateToken,Profile)

export default authRoutes;