const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/user/user.model');
const { validateUser, validateLogin } = require('../../services/validation/user');
const ApiError = require('../../helpers/ApiError');

exports.create = async (req, res, next) => {
    const { error } = validateUser(req.body); 
    try {
        if (error) 
            throw new ApiError(400, { message: error.details[0].message });
        
        if (!req.file) 
            throw new ApiError(422, { message: 'No image provided.' }); 
        
        const user = await User.findOne({ email: req.body.email });
        if (user) 
            throw new ApiError(400, { message: 'This email is already in use' });

        const hash = await bcrypt.hash(req.body.password, 10);
        const createdUser = await User({
            name: {
                'ar': req.body.nameAr,
                'en': req.body.nameEn
            },
            password: hash,
            email: req.body.email,
            profileImage: req.file.path
        }).save();
        res.status(201).send({
            createdUser,
            token: createToken(createdUser._id)
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { error } = validateLogin(req.body);
    try {
        if (error) 
            throw new ApiError(400, { message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) 
            throw new ApiError(400, { message: 'Email not exist' });

        const doMatch = await bcrypt.compare(req.body.password, user.password);
        if (!doMatch) 
            throw new ApiError(401, { message: 'Invalid password' });

        res.send({ token: createToken(user._id), user: user });
    } catch (error) {
       next(error); 
    }
};

exports.updateEmail = async (req, res, next) => {
    let { userId } = req.params;
    try {
        if(! +userId)
           throw new ApiError(400, { message: 'Enter a valid user Id' });

        await checkAuthority(userId, req.user._id);

        const user = await User.findById(userId);
        if(!user)
           throw new ApiError(404, { message: 'No user found with the provided email' });
            
        await User.findByIdAndUpdate(userId, { $set: { email: req.body.email } });
        res.send(204);   
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    let { userId } = req.params;
    let { error } = validateUser(req.body); 
    let imagePath;
    try {
        const user = User.findById(userId);
        if(!user)
            throw new ApiError(404, { message: 'No user found with the provided id' });

        await checkAuthority(userId, req.user._id);

        if (error) 
            throw new ApiError(400, { message: error.details[0].message });

        if(!req.file) {
            imagePath = req.user.profileImage;
        } else {
            imagePath = req.file.path;
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        const updateUser = {
            name: {
                'ar': req.body.nameAr,
                'en': req.body.nameEn
            },
            password: hash,
            email: req.body.email,
            profileImage: imagePath
        };
        const updatedUser = await User.findByIdAndUpdate(userId, updateUser, { new: true })
        res.status(200).send(updatedUser);
    } catch (error) {
        next(error);
    }
};



const createToken = (userId) => {
    return jwt.sign({ _id: userId }, config.get('jwtSecret'), { expiresIn: 600000 });
}

const checkAuthority = (user, otherUser) => {
    if (user != otherUser)
        throw new ApiError(403, { message: 'You are not allowed to access this resource' });
}