import { adminLogin ,editPage,Users,updateUser,addUser,Delete,Search} from '../Controller/Admincontroller.js'
import Router from 'express'
import authenticateToken from '../Midlewere/AuthenticateToken.js'
const adminRoutes=Router()

adminRoutes.post('/adminLogin',adminLogin)
adminRoutes.get('/edit',authenticateToken,editPage)
adminRoutes.get('/users',authenticateToken,Users)
adminRoutes.put('/updateuser',authenticateToken,updateUser)
adminRoutes.put('/addUser',authenticateToken,addUser)
adminRoutes.delete('/Delete',authenticateToken,Delete)
adminRoutes.post('/search',Search)

export default adminRoutes;