const { logger } = require('../../config/logger')
const answers = require('../../responses')
const userService = require('./userService')

const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!email || !username || !password) {
      return answers.badRequest(
        res,
        'Campos necessários: nome, email e senha'
      )
    }

    if (password.length < 6) {
      return answers.badRequest(
        res,
        'A senha precisa ter pelo menos 6 caracteres'
      )
    }

    const user = await userService.register(username, email, password)

    logger.info(user, 'User registered successfully')
    return answers.created(res, 'User registered successfully', user)
  } catch (error) {
    logger.error(error)
    const statusCode = error.statusCode ?? 500
    return answers.internalServerError(
      res,
      statusCode === 500 ? 'Server internal error' : error.message
    )
  }
}

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return answers.badRequest(res, 'Campos necessários: email e senha')
    }

    const user = await userService.login(email, password)

    logger.info(user, 'Login successful')
    return res.status(200).json({
      message: 'Login successful',
      user
    })
  } catch (error) {
    logger.error(error)

    const statusCode = error.statusCode ?? 500
    return answers.internalServerError(
      res,
      statusCode === 500 ? 'Server internal error' : error.message
    )
  }
}

module.exports = { registerUserController, loginUserController }
