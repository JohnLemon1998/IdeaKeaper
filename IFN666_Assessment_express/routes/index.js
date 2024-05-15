var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

router.get("/api/user", async (req, res) => {

  try {
    const users = await req.db.from("users").select("id", "name","password");
    res.json({ error: false, users });
  } catch (error) {
    res.json({ error: true, message: error });
  }
});

router.post("/api/signup", async (req, res) => {
  try {

    const { name, password } = req.body;

    const hashPassword = await bcrypt.hash(password,10);

    await req.db("users").insert({ name, password: hashPassword });

    res.json({ error: false, message: "User added successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await req.db("users").where({ name }).first();

    console.log("user",user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: true, message: "Invalid username or password" });
    }

    res.json({ error: false, message:"Login sucessfully!!" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});


module.exports = router;
