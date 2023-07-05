const Employee = require('../models/Employee');
const GetInfoByID = require('../utils/getInfoById');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    // console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const getEmployeeDataById = new GetInfoByID(Employee);
    await getEmployeeDataById.getById(req, res);
    // const { id } = req.params;
    // const employee = await Employee.findById(id);
    // if (!employee) {
    //   return res.status(404).json({ message: 'Employee not found' });
    // }
    // res.status(200).json(employee);
  } catch (error) {
    // console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Failed to fetch employee' });
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
    let { name } = req.body;
    const { age, designation, department } = req.body;

    // Convert name to lowercase
    name = name.toLowerCase();

    const employee = new Employee({ name, age, designation, department });

    // Check if the employee already exists
    const existingEmployee = await Employee.findOne({ name, age });
    if (existingEmployee) {
      return res.status(409).json({
        message: 'Employee already exists',
        employee: existingEmployee,
      });
    }

    await employee.save();
    // Set the header before sending the response
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (error) {
    // console.error('Error adding employee:', error);
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
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res
      .status(200)
      .json({ message: 'Employee deleted successfully', deletedEmployee });
  } catch (error) {
    // console.error('Error deleting employee:', error);
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
