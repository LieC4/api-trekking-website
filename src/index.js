// Library
const express = require('express');
const cors = require('cors');
// Routes
const HikeRoutes = require('./api/hikes/hike.routes');
const CustomerRoutes = require('./api/customers/customer.routes');
const AnimalRoutes = require('./api/animals/animal.routes');
const GuideRoutes = require('./api/guides/guide.routes');
// DB
const { connectDb } = require('./helpers/db');
// Port
const PORT = process.env.PORT || 8000;
// inicilizate express
const app = express();
// Connect DataBase
connectDb();
// Headers & Verbs
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Cors enable
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
// Json Data
app.use(express.json({ limit: '1mb' }))
// urlEncoded
app.use(express.urlencoded({ limit: '1mb', extended: true }));
// Routes
app.use('/api/hike', HikeRoutes);
app.use('/api/customer', CustomerRoutes);
app.use('/api/animal', AnimalRoutes);
app.use('/api/guide', GuideRoutes);
// Routes not found 404
app.use('*', (req, res, next) => {
    const error = new Error()
    error.status = 404
    error.message = 'Route not found'
    return next(error)
})
// Error handler
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})
// Enable Language
app.disable('x-powered-by')
// Open Listener Server
app.listen(PORT, () => {
    console.log('Server is running in http://localhost:' + PORT)
});