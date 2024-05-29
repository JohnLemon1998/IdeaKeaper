var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

router.post("/api/signup", async (req, res) => {
  try {
    // Extract name and password from request body
    const { name, password } = req.body;

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await req.db("users").insert({ name, password: hashPassword });

    // Respond with success
    res.json({ error: false });
  } catch (error) {
    // Respond with error message
    res.json({ error: true, message: error.message });
  }
});

// Login
router.post("/api/login", async (req, res) => {
  try {
    // Extract name and password from request body
    const { name, password } = req.body;

    // Find user in the database
    const user = await req.db("users").where({ name }).first();

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: true, message: "Invalid username or password" });
    }

    // Respond with user ID
    res.json({ error: false, id: user.id });
  } catch (error) {
    // Respond with error message
    res.status(500).json({ error: true, message: error.message });
  }
});

router.put('/api/users/:userId/change-username', async(req, res) => {
  const userId = req.params.userId;
  const { newUserName } = req.body;

  // Find user in the database
  const user = await req.db.from("users").where({ id: userId }).first();
  if (!user) {
    return res.status(404).json({ error: true, message: 'User not found' });
  }

  // Update user's username
  await req.db.from("users").where({ id: userId }).update({ name: newUserName });

  // Respond with success message
  res.json({ error: false, message: 'Username updated successfully' });
});

router.put('/api/users/:userId/change-password', async(req, res) => {
  const userId = req.params.userId;
  const { newPassword } = req.body;

  // Find user in the database
  const user = await req.db.from("users").where({ id: userId }).first();
  if (!user) {
    return res.status(404).json({ error: true, message: 'User not found' });
  }

  // Hash the new password
  const hashPassword = await bcrypt.hash(newPassword, 10);

  // Update user's password
  await req.db.from("users").where({ id: userId }).update({ password: hashPassword });

  // Respond with success message
  res.json({ error: false, message: 'Password updated successfully' });
});

router.get("/api/note", async (req, res) => {
  try {
    const userId = req.query.userId;

    // Get all notes for the user
    const notes = await req.db.from("notes").where({ user_id: userId });

    // Respond with notes
    res.json({ error: false, notes });
  } catch (error) {
    // Respond with error message
    res.status(500).json({ error: true, message: error.message });
  }
});

router.get("/api/note/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;

    // Find note in the database
    const note = await req.db.from("notes").where({ id: noteId }).first();

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // Respond with the note
    res.json({ error: false, note });
  } catch (error) {
    // Respond with error message
    res.status(500).json({ error: true, message: error.message });
  }
});

router.post("/api/note", async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    // Insert new note into the database
    await req.db("notes").insert({
      user_id: userId,
      title: title,
      content: content
    });

    // Respond with success message
    res.json({ error: false, message: "Note inserted successfully" });
  } catch (error) {
    // Respond with error message
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

    // Find note in the database
    const note = await req.db.from("notes").where({ id: noteId }).first();

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // Update the note
    await req.db.from("notes").where({ id: noteId }).update({ title, content });

    // Respond with success message
    res.json({ error: false, message: "Updated successfully" });
  } catch (error) {
    // Respond with error message
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

    // Respond with success message
    res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    // Respond with error message
    res.status(500).json({ error: true, message: error.message });
  }
});


module.exports = router;
