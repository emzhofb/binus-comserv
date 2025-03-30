const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://admin:admin@localhost:27017/comserv?authSource=admin')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const router = express.Router();

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  element: { type: String, required: true, enum: ['Air', 'Tanah', 'Udara', 'Api'] },
}, { timestamps: true });

const Character = mongoose.model('Character', CharacterSchema);

router.get('/characters', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/characters/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.json(character);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/characters', async (req, res) => {
  try {
    const newCharacter = await Character(req.body);
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/characters/:id', async (req, res) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCharacter) return res.status(404).json({ error: "Character not found" });
    res.json(updatedCharacter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/characters/:id', async (req, res) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) return res.status(404).json({ error: "Character not found" });
    res.json(deletedCharacter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.use('/api/v1', router);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
