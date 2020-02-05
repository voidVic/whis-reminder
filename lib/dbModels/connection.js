const config = require('config');
const mongoose = require('mongoose');

const mongooseOpts = config.get('app.mongoose');

module.exports = function () {
    mongoose.connect('mongodb+srv://' + mongooseOpts.k + ':' + mongooseOpts.v + '@whis-leg7s.gcp.mongodb.net/test?retryWrites=true&w=majority',
        {   
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        ).then(() => {
            console.log("Connected to MongoDB server Whis successfully".green);
        }).catch((err) => {
            console.log("Error while connecting to MongoDB: check'intergrationMongoInstance' config flag".red, err);
        });
}
