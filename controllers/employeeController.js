const Employee = require('../models/Employee');
const APIFeatures = require('../utils/apiFeatures');
const GetInfoByID = require('../utils/getInfoById');
const DeleteInfoByID = require('../utils/deleteInfo');
const AddEntity = require('../utils/addEntity');

const getAllEmployees = async (req, res) => {
  try {
    //Execute Query
    const features = new APIFeatures(Employee.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const employeeDetails = await features.query;

    //Send Response
    res.status(200).json(employeeDetails);

    // const employees = await Employee.find();
    // res.status(200).json(employees);
  } catch (error) {
    // console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const getEmployeeDataById = new GetInfoByID(Employee);
    await getEmployeeDataById.getById(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Employee' });
  }
};

const getEmployeesByAgeRange = async (req, res) => {
  try {
    const { min, max } = req.params;
    const employees = await Employee.find({ age: { $gte: min, $lte: max } });
    res.status(200).json(employees);
  } catch (error) {
    // console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

const getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const employees = await Employee.find({ department });
    res.status(200).json(employees);
  } catch (error) {
    // console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

const addEmployee = async (req, res) => {
  try {
    const addEmployeeData = new AddEntity(Employee);
    await addEmployeeData.addItem(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add employee' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, designation, department } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, age, designation, department },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res
      .status(200)
      .json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    // console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Failed to update employee' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const delEmployeeDataById = new DeleteInfoByID(Employee);
    await delEmployeeDataById.deleteInfo(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getEmployeesByAgeRange,
  getEmployeesByDepartment,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
