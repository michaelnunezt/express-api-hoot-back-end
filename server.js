const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const verifyToken = require('./middleware/verify-token')

// Routers/Controllers
const usersRouter = require('./controllers/users')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// ! Middleware
app.use(express.json()) // convert JSON body to JS on req.body
app.use(morgan('dev'))

// ! Routes go here
app.use('/users', usersRouter)

// Example of an authenticated route
app.get('/secure-path', verifyToken, async (req, res) => {
  console.log('User available in controller:', req.user)
  return res.json({ message: 'You accessed the secure path' })
})

app.listen(3001, () => {
  console.log('The express app is ready!');
});