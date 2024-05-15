var express = require('express');
var router = express.Router();

router.get("/books", (req, res) => {

  const books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "1984", author: "George Orwell" },
    { title: "Pride and Prejudice", author: "Jane Austen" },
  ];

  res.json(books);
});

router.get("/books/:title", (req, res) => {
  const title = req.params.title;
  res.send(`You requested information about the book with title: ${title}`);
});

router.get("/api/user", async (req, res) => {

  try {
    const users = await req.db.from("users").select("id", "name","password");
    res.json({ error: false, users });
  } catch (error) {
    res.json({ error: true, message: error });
  }
});

router.post("/api/user", async (req, res) => {
  try {

    const { id, name, password } = req.body;
    await req.db("users").insert({ id, name, password });

    res.json({ error: false, message: "User added successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
});


router.get("/api/city/:CountryCode", async (req, res) => {
  try {
    const [cities] = await req.db.query(
      "SELECT name, district FROM city WHERE CountryCode = ?",
      [req.params.CountryCode]
    );
    res.json({ error: false, cities });
  } catch (error) {
    res.json({ error: true, message: error });
  }
});

module.exports = router;
