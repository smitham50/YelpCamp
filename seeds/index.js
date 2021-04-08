const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database Connected');
});

const seedDB = async () => {
    await Campground.deleteMany({});

    const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

    for (let i = 0; i < 50; i++) {
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${sample(cities).city}, ${sample(cities).state}`
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});