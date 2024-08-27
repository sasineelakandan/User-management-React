import { adminLogin ,editPage,Users,updateUser,addUser} from '../Controller/Admincontroller.js'
import Router from 'express'

const adminRoutes=Router()

adminRoutes.post('/adminLogin',adminLogin)
adminRoutes.get('/edit',editPage)
adminRoutes.get('/Users',Users)
adminRoutes.put('/updateuser',updateUser)
adminRoutes.put('/addUser',addUser)
export default adminRoutes;