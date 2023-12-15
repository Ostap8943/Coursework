const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Додаємо middleware для обробки статичних файлів
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  // Змінено шлях до index.html через path.join
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    return res.status(400).json({ error: 'Invalid input. Please enter valid weight and height.' });
  }

  const bmi = weight / Math.pow(height, 2);

  res.json({ bmi });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
