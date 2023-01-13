const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const { appConst } = require('../router/constants')

// saving the login credentials into DB
const saveUserCredentials = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const encryptedPassword = await bcrypt.hash(req.body.Password, salt)
    console.log(encryptedPassword)
    req.body.Password = encryptedPassword
    const resp1 = await prisma.Users.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        EmailID: req.body.EmailID,
        Password: req.body.Password,
        PhoneNumber: req.body.PhoneNumber,
        roleId: req.body.roleId
      }
    })
    console.log(resp1)
    res.status(200).json({
      status: appConst.status.success,
      response: resp1,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}
const saveRoles = async (req, res) => {
  try {
    const resp = await prisma.Roles.create({
      data: {
        RoleName: req.body.RoleName
      }
    })
    console.log(resp)
    res.status(200).json({
      status: appConst.status.Success,
      response: resp,
      message: 'success!!!'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed!!...'
    })
  }
}
const getAllRecords = async (req, res) => {
  try {
    const users = await prisma.Users.findMany({
      include: { RoleId: true }
    })
    console.log(users)
    res.status(200).json({
      status: appConst.status.return,
      response: users,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}
const updateUser = async (req, res) => {
  try {
    const { id } = req.body.id
    const resp = await prisma.Users.update({
      where: { id: id },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        EmailID: req.body.EmailID,
        Password: req.body.Password,
        PhoneNumber: req.body.PhoneNumber,
        roleId: req.body.roleId,
        Roles: {
          update: {
            RoleName: req.body.RoleName
          }
        }
      },
      include: { RoleId: true }
    })
    res.status(200).json({
      status: appConst.status.update,
      response: resp,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}
const deleteUser = async (req, res) => {
  let userid = req.params['id']
  try {
    const resp = await prisma.Users.delete({
      where: { id: userid }
    })
    res.status(200).json({
      status: appConst.status.success,
      response: resp,
      message: 'Deleted!!'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed'
    })
  }
}

module.exports = { saveUserCredentials, saveRoles, getAllRecords, updateUser }
