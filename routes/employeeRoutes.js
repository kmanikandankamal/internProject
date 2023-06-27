const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/', employeeController.getAllEmployees);

router.get('/:id', employeeController.getEmployeeById);

router.get('/age/:min/:max', employeeController.getEmployeesByAgeRange);

router.get(
  '/department/:department',
  employeeController.getEmployeesByDepartment
);

router.post('/', employeeController.addEmployee);

router.put('/:id', employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
