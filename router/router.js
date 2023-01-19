const role_controller = require('../controllers/RolesController')
const router = require('express').Router()
router.post('/save', role_controller.saveUserCredentials)
// router.post('/saveRoles', role_controller.saveRoles)
router.post('/saveuser', role_controller.addUserDetails)
router.get('/fetchAll', role_controller.getAllRecords)
router.put('/updatingUser', role_controller.updateUser)
router.delete('/deletingUser', role_controller.deleteUser)
module.exports = router
