const express = require("express");

const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;

const symbols = [
  { name: 'BELL', chance: 0.25 },
  { name: 'HEAT', chance: 0.35 },
  { name: 'DIAMOND', chance: 0.40 }
];

const selectSymbol = () => {
  const rand = Math.random(); // Generate a random number between 0 and 1

  let cumulativeChance = 0;
  for (const symbol of symbols) {
    cumulativeChance += symbol.chance; // Increment the cumulative chance by the symbol's chance

    if (rand < cumulativeChance) {
      return symbol.name; // Return the symbol's name once the cumulative chance exceeds the random number
    }
  }
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use(express.json());

app.get('/config', (req, res) => {
  const list = [1, 2, 5, 10, 20, 50, 100];
  res.send(list);
});

app.get('/play', (req, res) => {

  const panelSymbols = [];
  for (let i = 0; i < 3; i++) {
    const symbol = selectSymbol();
    panelSymbols.push(symbol);
  }
  res.send(panelSymbols)  
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});