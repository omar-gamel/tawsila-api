const Client = require('../../models/client/client');
const Provider = require('../../models/provider/provider.model');
const Favorite = require('../../models/favourite/favourite.model');
const { validateFavorite } = require('../../services/validation/favorite');
const ApiError = require('../../helpers/ApiError');

exports.addToFavourite = async (req, res, next) => {
    const { error } = validateFavorite(req.body);
    let { clientId } = req.params;
    try {
        if (error) 
            throw new ApiError(400, { message: error.details[0].message });

        const client = await Client.findById(clientId);
        if (!client) 
            throw new ApiError(404, { message: 'Client not Found.' });

        if (clientId != req.user._id)
            throw new ApiError(401, { message: 'You are not allowed to access this resource' });    
         
        const provider = await Provider.findById(req.body.provider);
        if (!provider) 
            throw new ApiError(404, { message: 'provider not Found.' });

        const foundOne = await Favorite.findOne({ client: req.user._id, provider: req.body.provider });    
        if (foundOne)
            throw new ApiError(400, { message: 'Already added to favorite list' });
        
        await new Favorite({
            client: req.user._id,
            provider: req.body.provider
        }).save();
        res.send(204);
    } catch (error) {
        next(error);
    }
};


exports.removeFromFavourite = async (req, res, next) => {
    let { clientId } = req.params;
    try {
        const client = await Client.findById(clientId);
        if (!client) 
            throw new ApiError(404, { message: 'Client not Found.' });

        if (clientId != req.user._id)
            throw new ApiError(401, { message: 'You are not allowed to access this resource' });    
         
        const provider = await Provider.findById(req.body.provider);
        if (!provider) 
            throw new ApiError(404, { message: 'provider not Found.' });

        const foundfav = await Favorite.findOne({ client: req.user._id, provider: req.body.provider });    
        if (!foundfav)
            throw new ApiError(400, { message: 'Already removed' });

        await foundfav.remove();
        res.send(204);
    } catch (error) {
        next(error);
    }
};

exports.findAllClientFavourite = async (req, res, next) => {
    let page = +req.query.page || 1 , limit = +req.query.limit;
    let { clientId } = req.params;
    try {
        const query = { client: clientId };
        const client = await Client.findById(clientId);
        if (!client) 
            throw new ApiError(404, { message: 'Client not Found.' });

        const favoriteProviders = await Favorite.find(query).populate([
            { path: 'provider', populate: { path: 'user' } },
        ])
        .sort({ _id: -1 })
        .limit(limit)
        .skip((page - 1) * limit);
        const count = await Favorite.count();
        const pageCount = Math.ceil(count / limit);

        res.status(200).send({ favoriteProviders, page, pageCount, limit, count });
    } catch (error) {
        next(error);
    }
};