import express from 'express'
import { createEmployee, deleteEmployee, filterEmployeeByDept, getEmployee, searchEmployeeByEmpId, sortEmployeeBySalary, updateEmployee } from '../controller/emp.controller.js'
const router = express.Router()

router.post('/create', createEmployee);
router.get('/:id', getEmployee);
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/filter/dept/:id', filterEmployeeByDept);
router.get('/search/:empId', searchEmployeeByEmpId);
router.get('/sort/salary/', sortEmployeeBySalary);

export default router