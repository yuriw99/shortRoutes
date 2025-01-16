const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/addUserRoutes');
const shortRoutes = require('./routes/findShortestRoute');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'abcde', 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
      secure: false, 
      maxAge: 200 * 60 * 60 * 1000 
    }
  }));

app.use('/api', emailRoutes);
app.use('/api', userRoutes);
app.use('/api', shortRoutes); 

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
