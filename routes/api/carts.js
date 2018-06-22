const Cart = require('../../db').Cart
const route = require('express').Router();

route.get('/', (req, res) => {
  Cart.findAll()
      .then((carts) => {
          res.status(200).send(carts)
      })
      .catch((err) => {
          res.status(500).send({
              error: "Could not retrieve products"
          })
      })

})

route.post('/', (req, res) => {
  // Check for existence
  console.log(req.body.count);

    if(req.body.count == 0){
            console.log('hi')
            Cart.destroy({
              where: {
                prod_name: req.body.name,
                prod_manuf: req.body.manufacturer,
                prod_price: req.body.price
              }
            })
    }

    else{
      Cart.findAll({
      where: {
         prod_name: req.body.name,
         prod_manuf: req.body.manufacturer
        }
      }).then((result)=>{
        console.log(result)
          if (result.length != 0){
            Cart.update(
              {prod_count: result[0].prod_count + 1},
              { where: { prod_name: req.body.name,
                         prod_manuf: req.body.manufacturer
                        }
              }
            )
          }

        else{
          // Add a new product in Cart
          Cart.create({
            prod_name: req.body.name,
            prod_manuf: req.body.manufacturer,
            prod_price: parseFloat(req.body.price),
            prod_count: 1
          }).then((cart) => {
            res.status(201).send(cart)
          }).catch((error) => {
              res.status(501).send({
              error: "Error adding product"
            })
          })
        }
      })
    }
    })



exports = module.exports = route
