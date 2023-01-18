const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const { appConst } = require('../router/constants')

// saving the login credentials into DB
const addUserDetails = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const encryptedPassword = await bcrypt.hash(req.body.Password, salt)
    console.log(encryptedPassword)
    req.body.Password = encryptedPassword
    const userData = JSON.parse(JSON.stringify(req.body))
    let resp = []
    if (userData && Array.isArray(userData)) {
      for (let index = 0; index < userData.length; index++) {
        const element = userData[index]
        let user = prisma.Users.create({
          data: {
            firstName: element.firstName,
            lastName: element.lastName,
            EmailID: element.EmailID,
            Password: element.Password,
            PhoneNumber: element.PhoneNumber,
            Role: {
              create: {
                RoleName: element.RoleName
              }
            }
          },
          include: {
            Role: true
          }
        })
        resp.push(user)
      }
      //single record insertion
    } else {
      let user = prisma.Users.create({
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          EmailID: req.body.EmailID,
          Password: req.body.Password,
          PhoneNumber: req.body.PhoneNumber,
          Role: {
            create: {
              RoleName: req.body.RoleName
            }
          }
        },
        include: {
          Role: true
        }
      })

      resp.push(user)

      console.log(user)
    }

    const result = await prisma.$transaction(resp)

    console.log('Response:', result)

    // console.log(transaction);

    res.status(200).json({
      status: appConst.status.success,
      response: result,
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

// const saveUserCredentials = async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10)
//     console.log(salt)
//     const encryptedPassword = await bcrypt.hash(req.body.Password, salt)
//     console.log(encryptedPassword)
//     req.body.Password = encryptedPassword
//     const resp1 = await prisma.Users.create({
//       data: {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         EmailID: req.body.EmailID,
//         Password: req.body.Password,
//         PhoneNumber: req.body.PhoneNumber,
//         roleId: req.body.roleId
//       }
//     })
//     console.log(resp1)
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({
//       status: appConst.status.fail,
//       response: null,
//       message: 'failed'
//     })
//   }
// }
// const saveRoles = async (req, res) => {
//   try {
//     const resp = await prisma.Roles.create({
//       data: {
//         RoleName: req.body.RoleName
//       }
//     })
//     console.log(resp)
//     res.status(200).json({
//       status: appConst.status.Success,
//       response: resp,
//       message: 'success!!!'
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({
//       status: appConst.status.fail,
//       response: null,
//       message: 'failed!!...'
//     })
//   }
// }
const getAllRecords = async (req, res) => {
  try {
    const users = await prisma.Users.findMany({
      include: { Role: true }
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
    const resp = await prisma.Roles.update({
      where: {
        RoleID: req.body.roleId
      },
      data: {
        RoleName: req.body.RoleName,
        user: {
          update: {
            where: {
              id: req.body.roleId
            },
            data: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              EmailID: req.body.EmailID
            }
          }
        }
      }
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
  try {
    const resp1 = prisma.Users.delete({
      where: {
        id: req.body.id
      }
    })
    const resp = prisma.Roles.delete({
      where: {
        RoleID: req.body.RoleID
      }
    })
    const transaction = await prisma.$transaction([resp, resp1])
    console.log(transaction)
    res.status(200).json({
      status: appConst.status.delete_user,
      response: transaction,
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

module.exports = {
  addUserDetails,
  getAllRecords,
  updateUser,
  deleteUser
}
