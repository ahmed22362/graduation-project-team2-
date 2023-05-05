const bcrypt = require("bcrypt")

module.exports = correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}
