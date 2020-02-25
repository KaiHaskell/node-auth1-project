const db = require("../routers/auth-router/auth-model");
const bcrypt = require("bcryptjs");

function authWare(req, res, next) {
  let { username, password } = req.headers;
  if (username && password) {
    db.findBy({ username })
      .first()
      .then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
          res.status(400).json({ Error: "Invalid credentials." });
        } else {
          next();
        }
      })
      .catch(({ name, message, stack }) => {
        res.status(500).json({ name, message, stack });
      });
  }
}

module.exports = {
  authWare
};
