import { adminLogin ,editPage,Users,updateUser,addUser,Delete,Search} from '../Controller/Admincontroller.js'
import Router from 'express'

const adminRoutes=Router()

adminRoutes.post('/adminLogin',adminLogin)
adminRoutes.get('/edit',editPage)
adminRoutes.get('/Users',Users)
adminRoutes.put('/updateuser',updateUser)
adminRoutes.put('/addUser',addUser)
adminRoutes.delete('/Delete',Delete)
adminRoutes.post('/search',Search)

export default adminRoutes;