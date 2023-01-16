const Provider = require('../../models/provider/provider.model');
const { validateProvider } = require('../../services/validation/provider');
const ApiError = require('../../helpers/ApiError');

exports.create = async (req, res, next) => {
    const { error } = validateProvider(req.body);
    try {
        if (error) 
            throw new ApiError(400, { message: error.details[0].message });

        const provider = await  Provider.findOne({ user: req.user._id });
        if(provider)   
            throw new ApiError(400, { message: 'Already provider' });
        
        const createdClient = await Provider({
            _id: req.user._id,
            user: req.user._id,
            ...req.body
        }).save();
        res.status(201).send(createdClient);    
    } catch (error) {
        next(error);
    }
};

exports.findOne = async (req, res, next) => {
    let { id } = req.params;
    try {
        const provider = await Provider.findById(id);
        if (!provider)
            throw new ApiError(404, { message: 'Provider not Found' });

       res.send(provider);     

    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    let page = +req.query.page || 1 , limit = +req.query.limit;
    try {
        const providers = await Provider.find().populate([{ path: 'user' }])
            .limit(limit)
            .skip((page - 1) * limit);
        const count = await Provider.count();
        const pageCount = Math.ceil(count / limit);

        res.status(200).send({providers, page, pageCount, limit, count});
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    let { id } = req.params;
    try {
        const provider = await Provider.findById(id).populate('user');
        if (!provider) 
            throw new ApiError(404, { message: 'Provider not Found.' });
        
        await Provider.deleteOne({ user: id });
        res.send(204);    
    } catch (error) {
        next(error);
    }
};

exports.Update = async (req, res, next) => {
    const { error } = validateProvider(req.body); 
    let { id } = req.params;
    try {
        if (error) 
            throw new ApiError(400, { message: error.details[0].message });

        const provider = await Provider.findById(id).populate('user');
        if (!provider) 
            throw new ApiError(404, { message: 'Provider not Found.' });
        
        const updatedProvider = await Provider.findOneAndUpdate({ user: id }, req.body, { new: true });
        res.send(updatedProvider);    
    } catch (error) {
        next(error);
    }
};

