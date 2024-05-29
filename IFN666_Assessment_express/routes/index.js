var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

router.post("/api/signup", async (req, res) => {
  try {

    const { name, password } = req.body;

    const hashPassword = await bcrypt.hash(password,10);

    await req.db("users").insert({ name, password: hashPassword });

    res.json({ error: false });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await req.db("users").where({ name }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: true, message: "Invalid username or password" });
    }

    res.json({ error: false, id : user.id });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.put('/api/users/:userId/change-username', async(req, res) => {
  const userId = req.params.userId;
  const { newUserName } = req.body;

  const user = await req.db.from("users").where({ id: userId }).first();
  if (!user) {
    return res.status(404).json({ error: true, message: 'User not found' });
  }

  await req.db.from("users").where({ id: userId }).update({ name: newUserName });

  res.json({ error: false, message: 'Username updated successfully' });
});

router.put('/api/users/:userId/change-password', async(req, res) => {
  const userId = req.params.userId;
  const { newPassword } = req.body;

  const user = await req.db.from("users").where({ id: userId }).first();
  if (!user) {
    return res.status(404).json({ error: true, message: 'User not found' });
  }

  const hashPassword = await bcrypt.hash(newPassword,10);

  await req.db.from("users").where({ id: userId }).update({ password: hashPassword });

  res.json({ error: false, message: 'password updated successfully' });
});

router.get("/api/note", async (req, res) => {
  try {
    const userId = req.query.userId;

    const notes = await req.db.from("notes").where({ user_id: userId });

    res.json({ error: false, notes });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.get("/api/note/:noteId", async (req, res) => {

  try {
    const noteId = req.params.noteId;

    const note = await req.db.from("notes").where({ id: noteId }).first();

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    res.json({ error: false, note });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.post("/api/note", async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    await req.db("notes").insert({
      user_id: userId,
      title: title,
      content: content
    });

    res.json({ error: false, message: "Note inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.put("/api/note/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: true, message: "Title and content are required" });
    }

    const note = await req.db.from("notes").where({ id: noteId }).first();

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // Update the note
    await req.db.from("notes").where({ id: noteId }).update({ title, content });

    res.json({ error: false, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.delete("/api/note/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;

    // Find the note
    const note = await req.db.from("notes").where({ id: noteId }).first();

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // Delete the note
    await req.db.from("notes").where({ id: noteId }).del();

    res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});




module.exports = router;
