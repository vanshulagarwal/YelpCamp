const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("mongo connection open");
    })
    .catch(err => {
        console.log("oh no! mongo connection errorrrr");
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '649aeb963626b73e946c8c20',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque natus placeat accusamus tempora modi corporis rerum dolores cupiditate maiores laboriosam iure, beatae animi nulla sapiente eum, cum atque qui at!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/du6ftxmlp/image/upload/v1688076647/YelpCamp/guxrctppo7ecnxm1bsai.jpg',
                    filename: 'YelpCamp/guxrctppo7ecnxm1bsai'
                },
                {
                    url: 'https://res.cloudinary.com/du6ftxmlp/image/upload/v1688076647/YelpCamp/in7hvvz8tps8brzyfu4o.jpg',
                    filename: 'YelpCamp/in7hvvz8tps8brzyfu4o'
                }
            ]
        })
        await camp.save();
    }
}
seedDB(); 