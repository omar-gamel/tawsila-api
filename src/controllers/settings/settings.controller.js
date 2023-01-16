const Setting = require('../../models/app-settings/app-settings.model');
const { validateSetting } = require('../../services/validation/setting');
const ApiError = require('../../helpers/ApiError');

exports.create = async(req, res, next) => {
    const { error } = validateSetting(req.body);
    try {
        if (error) 
            throw new ApiError(400, { message: error.details[0].message });

        await checkDeliveryTypeAvailability(req);
        const createdSettings = await new Setting({
            user: req.user._id,
            ...req.body
        }).save();
        res.status(201).send(createdSettings);
    } catch (error) {
        next(error);
    }
};

exports.findOne = async(req, res, next) => {
    let { id } = req.params;
    try {
        const setting = await Setting.findById(id).populate('user');
        if (!setting) 
            throw new ApiError(404, { message: 'Setting not Found.' });
        
        res.send(setting);    
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    let page = +req.query.page || 1 , limit = +req.query.limit;
    try {
        const settings = await Setting.find().populate([{ path: 'user' }])
            .limit(limit)
            .skip((page - 1) * limit);
        const count = await Setting.count();
        const pageCount = Math.ceil(count / limit);

        res.status(200).send({settings, page, pageCount, limit, count});
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    let { id } = req.params;
    try {
        const setting = await Setting.findById(id).populate('user');
        if (!setting) 
            throw new ApiError(404, { message: 'Setting not Found.' });
        
        await Setting.deleteOne({ _id: id });
        res.send(204);    
    } catch (error) {
        next(error);
    }
};

exports.Update = async (req, res, next) => {
    const { error } = validateSetting(req.body); 
    let { id } = req.params;
    try {
        if (error) 
            throw new ApiError(400, { message: error.details[0].message });

        const setting = await Setting.findById(id);
        if (!setting) 
            throw new ApiError(404, { message: 'Setting not Found.' });

        await checkDeliveryTypeAvailability(req);    
        const updatedSetting = await Setting.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.send(updatedSetting);    
    } catch (error) {
        next(error);
    }
};


async function checkDeliveryTypeAvailability(req) {
    const types = ['SINGLE', 'MULTI'];
    if (req.body.deliveryType) {
        if (!(types.includes(req.body.deliveryType))) {
            throw new ApiError(400, { message: 'DeliveryType should be : SINGLE, MULTI' })
        }
    }
}