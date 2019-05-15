const express =require('express');
const Joi = require('joi');

const router = express.Router();


const users=[
    {
        id : 1 ,
firstname : "Omotayo" ,
lastname : 'Oyeniyi',
othername : 'Oluwatomi' ,
email : 'tmosco_tayo@yahoo.com' ,
phoneNumber :  123456,
passportUrl : 23435467657 ,
isAdmin : false ,
    },
    {
        id : 2 ,
        firstname : 'Omotayo ',
        lastname : 'Oyeniyi',
        othername :' Oluwatomi' ,
        email : 'tmoscotayo@yahoo.com' ,
        phoneNumber : 09060998169,
        passportUrl : 23435467657 ,
        isAdmin : true ,
    }

];

router.post('/', (req, res, next) => {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        firstname:Joi.string(),
        lastname:Joi.string(),
        isAdmin:Joi.boolean()
    }
     const result = Joi.validate(req.body, schema);
      console.log(result)
      
      if (result.error) {
        res.status(404).json({
          error: result.error.details[0].message,
        });
      }else{
      const user = {
        id: users.length + 1,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        othername : req.body.othername,
        email : req.body.email ,
        phoneNumber : req.body.phoneNumber,
        passportUrl : req.body.passportUrl ,
        isAdmin : req.body.isAdmin ,
      };
      users.push(user);
      res.status(201).json({
    
        message: 'User was created',
        createdParty: user,
      });
    }
    });



router.get('/', (req, res, next) => {
     res.status(200).json({
         message:"Here are all the users",
         user: users
     })
});

router.get('/:id', (req, res, next) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({
          message: 'user not found',
        });
      } res.status(200).json({
        user,
      });
});

router.patch('/:id', (req, res, next) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
});

router.delete('/:id', (req, res, next) => {

});


module.exports = router;
