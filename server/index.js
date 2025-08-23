import express from 'express';

const app = express();
app.use(express.json());

const db = {
  datasets: [],
  analyses: [],
  tasks: [],
  documents: [],
  'broker-connections': [],
  'trading-bots': [],
  users: []
};

let nextId = 1;

function getCollection(name) {
  return db[name];
}

app.get('/api/:resource', (req, res) => {
  const collection = getCollection(req.params.resource);
  if (!collection) return res.status(404).json({ error: 'Unknown resource' });
  res.json(collection);
});

app.get('/api/:resource/:id', (req, res) => {
  const collection = getCollection(req.params.resource);
  if (!collection) return res.status(404).json({ error: 'Unknown resource' });
  const item = collection.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/:resource', (req, res) => {
  const collection = getCollection(req.params.resource);
  if (!collection) return res.status(404).json({ error: 'Unknown resource' });
  const item = { id: nextId++, ...req.body };
  collection.push(item);
  res.status(201).json(item);
});

app.put('/api/:resource/:id', (req, res) => {
  const collection = getCollection(req.params.resource);
  if (!collection) return res.status(404).json({ error: 'Unknown resource' });
  const index = collection.findIndex((i) => i.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  collection[index] = { ...collection[index], ...req.body };
  res.json(collection[index]);
});

app.delete('/api/:resource/:id', (req, res) => {
  const collection = getCollection(req.params.resource);
  if (!collection) return res.status(404).json({ error: 'Unknown resource' });
  const index = collection.findIndex((i) => i.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  collection.splice(index, 1);
  res.status(204).end();
});

app.listen(3000);
