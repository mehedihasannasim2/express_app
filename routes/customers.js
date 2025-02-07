// const Joi = require('joi');
const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => { 
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    
    res.send(customer);
});


router.put('/:id', async (req, res) =>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(result.error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold 
            
        }, {new: true });

    if (!customer) return res.status(404).send('This customer with the given ID was not found.');

    res.send(customer)
    
});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id });
    
    if (!customer) return res.status(404).send('This customer with the given ID was not found.');
    
    res.send(customer);
});


router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    
    if (!customer) return res.status(404).send('This customer with the given ID was not found.');
    
    res.send(customer);
});

module.exports = router; 


// Schema & model both are here
// const Customer = mongoose.model('Customer', new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     },
//     isGold: {
//         Boolean,
//         default: false
//     },
//     phone: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     },


// }));



// function validate(customer) {
    //     const schema = Joi.object({
        //         name : Joi.string().min(5).max(50).required(),
        //         phone : Joi.string().min(5).max(50).required(),
        //         isGold: Joi.boolean()
//     });
//     return schema.validate(customer);
// }