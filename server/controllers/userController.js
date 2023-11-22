const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res) => {
  const { name, email, profilePhoto } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        {
          name: name,
          email: email,
          profilePhoto: profilePhoto,
        },
        "et39i4bi4",
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json(user, token);
    }

    const newUser = new User({
      name: name,
      email: email,
      profilePhoto: profilePhoto,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        name: name,
        email: email,
        profilePhoto: profilePhoto,
      },
      "et39i4bi4",
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      user: user,
      token: token,
      message: "Authentication Successfull",
    });
  } catch (error) {}
};
