import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors(), express.json());

let lastUser = null;

app.post('/api/user', (req, res) => {
  const { firstName, lastName, dob } = req.body;
  if (!firstName || !lastName || !dob)
    return res.status(400).json({ error: 'all fields required' });
  lastUser = { firstName, lastName, dob };
  res.status(201).json({ message: 'saved' });
});

app.get('/api/user', (req, res) => {
  if (!lastUser) {
    return res.status(404).json({ error: 'no user saved' });
  }
  res.json(lastUser);
});


app.listen(3001, () => console.log('Server: http://localhost:3001'));



