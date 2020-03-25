const auth = require("../middleware/auth");
const { Project, validate } = require("../models/project-model");
const { User } = require("../models/user-model");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.body.userId);
    
    if (!user) {
        return res.status(400).send({ message: 'Usuário incorreto para criação de projeto'});
    }

    Project.create({
        title: req.body.title,
        user_owner: req.body.userId
    }, (error) => {
        if (error) 
            res.status(500).send(error.message);
        else
            res.sendStatus(200);
    });
});

module.exports = router;