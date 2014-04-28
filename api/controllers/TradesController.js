/**
 * TradesController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  buy: function(req, res) {

    if (!req.param('buyer')) return res.send("No buyer specified!", 404);
    if (!req.param('item')) return res.send("No item specified!", 404);
    if (!req.param('seller')) return res.send("No seller to purchace from specified!", 404);
    if (req.param('buyer') == req.param('seller')) return res.send("You can't buy from yourself", 400);

    People.findOne(req.param('buyer')).done(function (err, buyer) {
      if (err) return res.send(err, 500);
      if (!buyer) return res.send("No buyer with that id exists!", 404);

      People.findOne(req.param('seller')).done(function (err, seller) {
        if (err) return res.send(err, 500);
        if (!seller) return res.send("No seller to purchace from with that id exists!", 404);

        Trades.findOne(req.param('item')).done(function (err, item) {
          if (err) return res.send(err, 500);
          if (!item) return res.send("No item with that id exists!", 404);

          console.log(buyer['name'] + " wants to buy " + item['name'] + " from " + seller['name'] + " for " + item['value'] + " beans." )

          var balance = Number(buyer.beans);
          balance -= Number(item['value']);

          if (balance < 0) {
            return res.send("Not enough beans!", 400);
          } else {
            buyer.beans = balance;

            buyer.save(function (err) {
              if (err) return res.send(err,500);
              res.json(buyer);
            });
          }

          var sellerTransaction = Number(seller.beans);
          sellerTransaction += Number(item['value']);
          seller.beans = sellerTransaction;

          seller.save(function (err) {
            if (err) return res.send(err,500);
            console.log(seller);
          });

        });

      });

    });

  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TradesController)
   */
  _config: {}

  
};
