const User = require ('../models/User');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const senEmail = require('../utils/sendEmail');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  const { username, email, password, role, address1, contact } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ success: false, error: 'provide all the information'})
  }

  const userExists = await User.findOne({email})
  if (!!userExists) {
    res.status(400).json({ success: false, error: 'Provided email already exists.'})
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      role,
      address1,
      contact
    })

    sendToken(user, 201, res)
    // send Email
    const message = `
    <h1>Register Confirmation</h1>
    <p>welcome!</p>
    <p>you have registered your email to us.</p>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome email - register successful',
        text: message
      })
      res.status(200).json({ success: true, data: 'Email has been sent'});
    } catch (error) {
      console.log(error)
    }

  } catch (error) {
    console.log(error);
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ success: false, error: 'no email or no password provided'})
  }

  try {
    const user = await User.findOne({email}).select('+password');

    if(!user) {
      return res.status(401).json({ success: false, error: 'Invalid Credentials' })
    }

    const isMatch = await user.matchPasswords(password);

    if(!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid Credentials' });
    }

    sendToken(user, 200, res);

  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({email: email});

    console.log(user)

    if (!user) {
      return next(new ErrorResponse('No email was found', 404))
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to below link to update your password</p>
      <p><a href=${resetUrl} clicktracking-off>Reset Password</a></p>
    `
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      })

      res.status(200).json({ success: true, data: 'Email has been sent'});
    } catch (error) {
      console.log(error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new ErrorResponse('Email has not been sent out', 500))
    }
  } catch (error) {
    console.log(error);
  }
}

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');
  
  try {
    const user = await User.findOne({resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }})

    if (!user) {
      return next(new ErrorResponse('Invalid Token', 400))
    }

    user.password = req.body.password;
    user.resetPaswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: 'Password has been succesfully updated.',
    })
  } catch (error) {
    console.log(error)
  }
}

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({ success: true, token, user: user })
}