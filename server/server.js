const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/addUserRoutes');
const shortRoutes = require('./routes/findShortestRoute');
const routeRoutes = require('./routes/routeRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = 5000;

app.use(
    cors({
      origin: "http://localhost:3000", 
      credentials: true, 
    })
  );
app.use(cookieParser());
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
app.use('/api', routeRoutes)

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.get('/user', (req, res) => {
    console.log(req.session);
    if (req.session.user){
        return res.status(200).json({email: req.session.user.email, password: req.session.user.password});
    }else {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
