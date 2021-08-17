const { Router } = require('express');
let express =  require('express');
let router = express.Router();
let validateSession = require('../middleware/validate.session');
let Practice= require('../db').import('../models/practice');

router.get('/log', validateSession, function(req, res) 
{
    res.send('Check my route!')
});


/*****
 /** **CREATE***
 *****/
router.post('/log', validateSession, (req, res) =>  {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner: req.user.id
    }
    Log.create(logEntry)
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({error: err}))
});
/*******
 * GET ALL LOGS*
 */
router.get("/", (req,res) => {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({error: err}))
});

/*****
 * GET LOGS BY USER *
 */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
       where: { owner: userid } 
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

/*******
 * GET LOGS BY ID ***
 ********/
 router.get("/:id", function (req, res) {
    let title = req.params.title;
    Log.findAll({
       where: { title: title } 
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

router.put("/log/:id", validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
    };
    const query = { where: { id: req.params.entryId, owner: req.user.id} };

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch((err) => res.status(500).json ({ error: err }));
});

module.exports = router;