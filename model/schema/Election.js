/**
 * Created by Akelaus on 12/2/13.
 */

// Create a schema for our data
var ElectionSchema = new Schema({
    //add attributes here
    date: Date
});

// Use the schema to register a model with MongoDb
mongoose.model('Election', ElectionSchema);
var Election = mongoose.model('Election');
