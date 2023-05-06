const bcrypt = require("bcrypt")
const emailValidator = require("deep-email-validator")

exports.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}
exports.isEmailValid = async function (email) {
  return emailValidator.validate(email)
}
