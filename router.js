const express = require('express');
const Outfit = require('./model/schema');
const router = express.Router();

// Random Outfit Route with mood filter
router.post('/random-outfit', async (req, res) => {
  const { mood } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  // Define categories for different moods
  const moodCategories = {
    happy: ['t-shirt', 'jeans', 'sneakers', 'accessory'],
    sad: ['shirt', 'jeans', 'boots', 'accessory'],
    excited: ['t-shirt', 'jacket', 'jeans', 'sneakers'],
  };

  if (!moodCategories[mood.toLowerCase()]) {
    return res.status(400).json({ error: 'Invalid mood' });
  }

  const selectedCategories = moodCategories[mood.toLowerCase()];
  const outfit = {};
  const missingCategories = [];

  try {
    for (const category of selectedCategories) {
      console.log(`Searching for category: ${category}, mood: ${mood}`);

      const outfitItem = await Outfit.findOne({
        category: category.toLowerCase(),
        mood: mood.toLowerCase(),
      });

      if (!outfitItem) {
        missingCategories.push(category);
        continue;
      }

      outfit[category] = outfitItem;
    }

    if (missingCategories.length > 0) {
      return res.status(404).json({
        error: `No items found for categories: ${missingCategories.join(', ')}`,
      });
    }

    res.json(outfit);
  } catch (err) {
    console.error('Error generating outfit:', err);
    res.status(500).json({ error: 'Error generating outfit' });
  }
});

// Get an outfit by ID
router.get('/outfit/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id);
    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }
    res.json(outfit);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching outfit' });
  }
});

// Add a new outfit item
router.post('/outfit', async (req, res) => {
  const { category, mood } = req.body;

  if (!category || !mood) {
    return res.status(400).json({ error: 'Category and mood are required' });
  }

  try {
    const newOutfit = new Outfit({ category, mood });
    await newOutfit.save();
    res.status(201).json(newOutfit);
  } catch (err) {
    res.status(500).json({ error: 'Error adding outfit' });
  }
});

// Update an existing outfit item
router.put('/outfit/:id', async (req, res) => {
  try {
    const updatedOutfit = await Outfit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOutfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    res.json(updatedOutfit);
  } catch (err) {
    res.status(500).json({ error: 'Error updating outfit' });
  }
});

// Delete an outfit item by ID
router.delete('/outfit/:id', async (req, res) => {
  try {
    const deletedOutfit = await Outfit.findByIdAndDelete(req.params.id);
    if (!deletedOutfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    res.json({ message: 'Outfit deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting outfit' });
  }
});

module.exports = router;
