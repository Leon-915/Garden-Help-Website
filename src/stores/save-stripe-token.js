var stripe = require('stripe');

module.exports = function (ctx, req, res) {
    stripe(ctx.secrets.stripeSecretKey).charges.create({
        amount: ctx.body.amount,
        currency: ctx.body.currency,
        source: ctx.body.stripeToken,
        description: 'Coffee for Tomek'
    }, function (error, charge) {
        var status = error ? 400 : 200;
        var message = error ? error.message : 'Thanks for coffee!';
        res.writeHead(status, { 'Content-Type': 'text/html' });
        return res.end('<h1>' + message + '</h1>');
    });
};
