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
        const location = `${sample(cities).city}, ${sample(cities).state}`;
        const campground = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location,
            geometry: {
                type: 'Point',
                coordinates: [-113.1331, 47.0202]
            },
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor nulla nam perferendis quia? Distinctio provident debitis ipsum excepturi esse odio dignissimos autem adipisci dolorem optio praesentium, non nostrum, ullam repudiandae!',
            images: [
                { 
                    "url": "https://res.cloudinary.com/dip0eqlvh/image/upload/v1619390726/YelpCamp/jsqmfppesdiy9masle4j.jpg", 
                    "filename": "YelpCamp/jsqmfppesdiy9masle4j" 
                }, 
                { 
                    "url": "https://res.cloudinary.com/dip0eqlvh/image/upload/v1619390726/YelpCamp/hvf5x5x8ayrnpmbq2eku.jpg", 
                    "filename": "YelpCamp/hvf5x5x8ayrnpmbq2eku" 
                }, 
                { 
                    "url": "https://res.cloudinary.com/dip0eqlvh/image/upload/v1619390727/YelpCamp/hiloatry30yfn8hhx5iq.jpg", 
                    "filename": "YelpCamp/hiloatry30yfn8hhx5iq" 
                }
            ],
            price,
            author: "6081e4113bc993c7ab25f4da"
        });
        
        await campground.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});