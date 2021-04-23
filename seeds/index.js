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
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${sample(cities).city}, ${sample(cities).state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor nulla nam perferendis quia? Distinctio provident debitis ipsum excepturi esse odio dignissimos autem adipisci dolorem optio praesentium, non nostrum, ullam repudiandae!',
            price,
            author: "6081e4113bc993c7ab25f4da"
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});