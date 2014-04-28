/**
 * ActionsController
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
    
  run: function(req, res) {
    
    People.findOne(req.param('user')).done(function (err, user) {
      if (err) return res.send(err,500);
      if (!user) return res.send("No user with that id exists!", 404);

      Actions.findOne(req.param('action')).done(function (err, action) {
        if (err) return res.send(err,500);
        if (!action) return res.send("No action with that id exists!", 404);

        var balance = Number(user.beans);
        balance += Number(action['value']);

        if (balance < 0) {
          return res.send("Not enough beans!", 200);
        } else {
          user.beans = balance;

          user.save(function (err) {
            if (err) return res.send(err,500);
            res.json(user);
          });
        }

      });

    });

  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ActionsController)
   */
  _config: {}
  
};