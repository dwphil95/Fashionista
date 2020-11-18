const User = require('../models/User')
const env = require('../DB')
const jwt = require('jsonwebtoken')

exports.register = function (req, res) {
  const { username, email, password, passwordConfirmation } = req.body
  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }

  if (password != passwordConfirmation) {
    return res.status(422).json({ 'error': 'Password does not match' })
  }
  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new User({
        username, email, password
      })

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        return res.status(200).json({ 'registered': true })
      })
    }
  })
 }
exports.login = function (req, res) { 
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }

    if (!user) {
      return res.status(422).json({ 'error': 'Invalid user' })
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        env.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }
    else {
      return res.status(422).json({ 'error': 'Wrong email or password' })
    }
  })
}

exports.authMiddleware = function (req, res, next) {
  const json_token = req.headers.authorization
  try {
    if (json_token) {
      const user = parseToken(json_token)
      User.findById(user.userId, function (err, user) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        if (user) {
          res.locals.user = user
          next()
        }
        else {
          return res.status(422).json({ 'error': 'Not authorized user' })
        }
      })
    }
    else {
      return res.status(422).json({ 'error': 'Not authorized user' })
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err
    })
  }
}

var UserModel = require("../models/User")

exports.GetUsers = function (req, res) {
  UserModel.find({}, (err, data) => {
    if (err) throw err
    res.json(data)
  })
}

exports.GetUserByUsername = function (req, res) {
  var userName = req.params.username
  UserModel.findOne({username: userName}, (err, data) => {
    if (err) throw err
    console.log(data)
    res.json(data)
  })
}

exports.MakeAdmin = function (req, res) {
  var userName = req.body.username
  var userEmail = req.body.email
  var userPswd = req.body.password
  var adminStatus = true

  UserModel.updateOne({username: userName}, {$set:{username:userName, email:userEmail, password: userPswd, admin:adminStatus}}, (err, result) => {
    if (err) throw err
    if (result.nModified > 0)
        res.json({"msg": "Admin status updated successfully"})
    else
        res.json({"msg": "Admin status didn't update"})
  })
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], env.secret)
}