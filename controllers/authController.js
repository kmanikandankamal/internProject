const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/User');
const GetInfoByID = require('../utils/getInfoById');
const DeleteInfoByID = require('../utils/deleteInfo');
// const AddEntity = require('../utils/addEntity');

const registerUser = async (req, res) => {
  try {
    // const addUserData = new AddEntity(User);
    // await addUserData.addItem(req, res);
    const { username, password, passwordConfirm, role } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const user = new User({ username, password, passwordConfirm, role });
    await user.save();
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRES_IN,
    // });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username and password
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const { role } = user;

    res.status(200).json({ message: 'Login successful', role });
  } catch (error) {
    // console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
};

const getAllUser = async (req, res) => {
  try {
    const userItems = await User.find();
    res.status(200).json(userItems);
  } catch (error) {
    // console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
};

const getUserById = async (req, res) => {
  try {
    const getUserDataById = new GetInfoByID(User);
    await getUserDataById.getById(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch User' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    // Find the user by ID
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    // console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const delUserDataById = new DeleteInfoByID(User);
    await delUserDataById.deleteInfo(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user data' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
};
