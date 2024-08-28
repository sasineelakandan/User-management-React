import Router from 'express'
import { Signup,Login,Profile,Images} from '../Controller/Authcontroler.js'
import AuthenticateToken from '../Midlewere/AuthenticateToken.js'


const authRoutes=Router()

authRoutes.post('/signup',Signup)
authRoutes.post('/login',Login)
authRoutes.patch('/Images',Images)
authRoutes.get('/profile',AuthenticateToken,Profile)


export default authRoutes;