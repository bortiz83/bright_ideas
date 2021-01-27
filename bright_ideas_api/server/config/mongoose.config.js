const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/bright_ideas", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('Established connection to the database bright_ideas'))
.catch(()=> console.log('There was an error connecting to the database bright_ideas'));
