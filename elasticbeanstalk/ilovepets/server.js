'use strict';

var Promise = global.Promise || require('promise');

var express = require('express'),
    exphbs  = require('express-handlebars')
    //helpers = require('./lib/helpers');

var app = express();

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
    defaultLayout: 'main',
    //helpers      : helpers,

    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
        //'shared/templates/',
        'views/partials/'
    ]
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to expose the app's shared templates to the client-side of the app
// for pages which need them.
function exposeTemplates(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    hbs.getTemplates('shared/templates/', {
        cache      : app.enabled('view cache'),
        precompiled: true
    }).then(function (templates) {
        // RegExp to remove the ".handlebars" extension from the template names.
        var extRegex = new RegExp(hbs.extname + '$');

        // Creates an array of templates which are exposed via
        // `res.locals.templates`.
        templates = Object.keys(templates).map(function (name) {
            return {
                name    : name.replace(extRegex, ''),
                template: templates[name]
            };
        });

        // Exposes the templates during view rendering.
        if (templates.length) {
            res.locals.templates = templates;
        }

        setImmediate(next);
    })
    .catch(next);
}

app.get('/', function (req, res) {

    const number =  Math.floor(Math.random() * (5 - 1) + 1)

    res.render('home', {
        title: 'Ilovepets - Adopt a buddy',
        number: number
    });
});

app.get('/dogs', function (req, res) {
    res.render('dogs', {
        title: 'Dogs for Adoption',
        dogs: 'List of dogs is coming soon'
    });
});

app.get('/cats', function (req, res) {
    res.render('cats', {
        title: 'Cats for Adoption',
        cats: 'List of cats is coming soon'
    });
});

app.use(express.static('static'))

app.listen(process.env.PORT || 3000, function () {
    console.log('Ilovepets app is running...');
});
