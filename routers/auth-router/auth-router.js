const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Auth = require("./auth-model");

//Get a list of users
router.get("/", (req, res) => {
  Auth.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Could not retrieve users" });
    });
});

//Add a user
router.post("/register", (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 8);

  credentials.password = hash;

  Auth.add(credentials)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Could not add a user to the table" });
    });
});

//Let a user login
router.post("/login", (req, res) => {
  let { user, password } = req.body;
  console.log(user, password);
  Auth.findBy(user)
    .first()
    .then(data => {
      if (!data || !bcrypt.compareSync(password, data.password)) {
        return res.status(401).json({ error: "Incorrect credentials" });
      } else {
        return res
          .status(200)
          .json({ message: `Welcome ${user}`, user_id: res.id });
      }
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack });
    });
});

module.exports = router;
