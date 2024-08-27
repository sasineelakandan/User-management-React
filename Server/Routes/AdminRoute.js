import { adminLogin ,editPage,Users,updateUser} from '../Controller/Admincontroller.js'
import Router from 'express'

const adminRoutes=Router()

adminRoutes.post('/adminLogin',adminLogin)
adminRoutes.get('/edit',editPage)
adminRoutes.get('/Users',Users)
adminRoutes.put('/updateuser',updateUser)
export default adminRoutes;