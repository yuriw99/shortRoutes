const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema ({
    userEmail: String,
    routes: Array,
    directions: Array,
    minutes: String
})

const Route = mongoose.model('Route', RouteSchema);
module.exports = Route;