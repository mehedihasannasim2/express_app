const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered..');

    user = new User(_.pick(req.body, ['name', 'email', 'password'])); 

    await user.save();

    res.send(_.pick(user, ['_id','name', 'email']));

});



// router.post('/', async (req, res) => { 
//     const users = await User.find().sort('name');
//     res.send(users);
// })

module.exports = router; 

// router.post('/', async (req, res) => {
//     const { error } = validateuser(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let user = new user({ name: req.body.name });
//     user = await user.save();

//     res.send(user);
// });


// router.put('/:id', async (req, res) =>{
//     const { error } = validateuser(req.body); 
//     if (error) return res.status(400).send(result.error.details[0].message);

//     const user = await user.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
//         new: true 
//     });

//     if (!user) return res.status(404).send('This user with the given ID was not found.');

//     res.send(user)

// });


// router.delete('/:id', async (req, res) => {
//     const user = await user.findOneAndDelete({ _id: req.params.id });
    
//     if (!user) return res.status(404).send('This user with the given ID was not found.');
    
//     res.send(user);
// });


// router.get('/:id', async (req, res) => {
//     const user = await user.findById(req.params.id)

//     if (!user) return res.status(404).send('This user with the given ID was not found.');
    
//     res.send(user);
// });
