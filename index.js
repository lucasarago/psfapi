'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 80;
const router = express.Router();
const employees = [];

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors())

router.get('/', (req, res) => {
    res.status(200).send({ message: `API PSF V1 is OnLine`})
})

router.get('/employees', (req, res) => {
//	let employeesFJ;
//	fs.readFile('./employee.json', 'utf-8', (err, data) => {
//		if (err) {
//			throw err;
//		}
//	res.status(200).send(data);
	res.status(200).send(employees);
//	});
});

router.get('/perPerson/:id', (req, res) => {
    let empReturn;
    let flag = false;
    employees.forEach(
        (employee) => {
            if(employee.id == req.params.id){
                empReturn = employee;
                flag = true;
            }
        } 
    );
    flag ?  res.status(200).send({Employee: empReturn}) :
            res.status(404).send({message: `Employee not found`});
});

router.get('/perPerson/:id/:field', (req, res) => {
    let empReturn;
    let flag = false;
    let fieldToFind;
    employees.forEach(
        (employee) => {
            if(employee.id == req.params.id){
                empReturn = employee;
                flag = true;
            }
        } 
    );

    if(flag){
        let fields = Object.keys(empReturn);
        fields.forEach((field) => {
            if(field = req.params.field){
                fieldToFind = empReturn[`${field}`];
            }
        });
    }
    flag ?  res.status(200).send({Field: fieldToFind}) :
            res.status(404).send({message: `Employee not found`});
});

router.post('/perPerson', (req, res) => {
    let employee = req.body;
    employee.id = Math.random().toString(36).substring(2, 12);
    employees.push(employee);
    res.status(200).send({Result: {message: `The employee was created`, employee}});
});
 
router.post('/perPerson/batch', (req, res) => {
    let employeesBatch = req.body;
    console.log(employeesBatch)
    employeesBatch.forEach(
        (empl) => {
            let newEmployee = empl;
            newEmployee.id = Math.random().toString(36).substring(2, 12);
            employees.push(newEmployee);
        }
    );
//    fs.writeFile('employee.json', JSON.stringify(employees), (err) => {
//	if(err) {
//		throw err;
//	}
//	console.log("Data saved");
//	});
    res.status(200).send({Result: {message: `The employees were created`}, employees});
});

router.put('/perPerson/:id', (req, res) => {
    let flag = false;
    let updatedEmployee = req.body;
    employees.forEach(
        (employee, index) => {
            if(employee.id == req.params.id){
                employees[index] = req.body;
                employees[index].id = req.params.id;
                flag = true;
            }
        }
    );
    flag ?  res.status(200).send({Result: {message: `The employee was updated`}, updatedEmployee}) :
            res.status(404).send({message: 'Employee not found'});
});

router.delete('/perPerson/:id', (req, res) => {
    let deletedEmployee;
    let flag = false;
    employees.forEach(
        (employee, index) => {
            if(employee.id == req.params.id){
                deletedEmployee = employee;
                employees.splice(index, 1);
                flag = true;
            }
        }
    )
    flag ?  res.status(200).send({Result: {message: `The employee was deleted`}, deletedEmployee}) :
            res.status(404).send({message: 'Employee not found'});
});

app.use('/api/v1', router);
app.listen(port, () => {
    console.log(`API REST running on: ${port}`)
})
