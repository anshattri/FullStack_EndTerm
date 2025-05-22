const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/complaints', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Complaint = require('./models/Complaint');
app.post('/api/complaints', async (req, res) => {
  const { userName, issue, priority } = req.body;
  try {
    const newComplaint = new Complaint({
      userName,
      issue,
      priority,
      timestamp: new Date(),
    });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint logged successfully' });
  } catch (error) {
    console.error("Error saving complaint:", error);  // ← Add this
    res.status(500).json({ error: 'Failed to log complaint' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
