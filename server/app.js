/*require("dotenv").config();  */
let express =  require('express');
let app = express();

let sequelize = require('./db');

let log = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');

 sequelize.sync();
sequelize.sync({force: true})
app.use(express.json());

/*********
//  * Exposed route
//  */
 app.use('/user', user);

 /*******
  * Protected Route
  */
 app.use(require('./middleware/validate.session'));
app.use('/log', log);


app.listen(4000, function() {
    console.log("App is listening on port 4000");
});