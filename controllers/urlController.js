const Url = require('../models/Url');

exports.home = (req, res) => {
    res.render('index');
}

exports.shorten = async (req, res, next) => {
    console.log(req.body.urlOriginal);

    let response;
    const url = new Url({
        urlOriginal: req.body.urlOriginal
    });

    try{
        let result = await url.save();
        response = {
            status: 201,
            message: 'Url shortened successfully',
            data: result.shorten
        }
    }catch(error){
        console.log(error);
        response = {
            error: true,
            status: 500,
            message: error.message
        }
    }
    res.json(response);
    next();
}

//This is the route for the short url
exports.redirect = async (req, res, next) => {
    const url = await Url.findOne({shorten: req.params.shorten});

    if (!url) {
        res.redirect('/?error=404');
        return next();
    }

    res.redirect(url.urlOriginal);
}


