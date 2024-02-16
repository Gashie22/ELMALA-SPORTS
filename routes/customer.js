const express=require('express')
const router =express.Router()
//accesing the controller
const customerController=require('../controller/customerController')

 
//first route
router.get('/dashboard', customerController.isLocked,customerController.Homepage) //path, controller name/function in controller
router.get('/add',customerController.isLocked,customerController.AddUser) //path, controller name/function in controller
router.post('/add',customerController.isLocked,customerController.PostUser) //path, controller name/function in controller
router.post('/search',customerController.isLocked,customerController.searchUser) //path, controller name/function in controller
router.get('/details/:id',customerController.isLocked,customerController.ViewUser) //path, controller name/function in controller
router.get('/about',customerController.isLocked,customerController.aboutUser) //path, controller name/function in controller
//path, controller name/function in controller
router.get('/edit/:id',customerController.edit) //path, controller name/function in controller
//router.put('/edit/:id',customerController) //path, controller name/function in controller
router.put('/edit/:id',customerController.isLocked, customerController.editPost);
router.get('/clients',customerController.isLocked,customerController.clients)
router.delete('/edit/:id',customerController.isLocked,customerController.deleteUser) //path, controller name/function in controller

module.exports=router 