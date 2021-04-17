
'use strict'

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())

router.get('/', (req, res) => {
    res.status(200).send({ message: `API PSF V1 is OnLine`})
})

router.get('/employees', (req, res) => {
	fs.readFile('./employee.json', 'utf-8', (err, data) => {
		if (err) res.status(500).send({message: `Internal Server Error ${err}`});
        else res.status(200).send(data);
	});
});

router.get('/perPerson/:id', (req, res) => {
    const empJSON = fs.readFileSync('./employee.json', 'utf-8', (err, data) => {
        if (err) throw err;
	});
    let emp = JSON.parse(empJSON);
    let empReturn;
    emp.forEach((employee) => {
        if(employee.id == req.params.id){
            empReturn = employee;
        }
    });
    empReturn != undefined ?    res.status(200).send({Employee: empReturn}) :
                                res.status(404).send({message: `Employee not found`});
});

router.get('/perPerson/:id/:field', (req, res) => {
    let fieldToFind;
    const empJSON = fs.readFileSync('./employee.json', 'utf-8', (err, data) => {
        if (err) throw err;
	});
    let emp = JSON.parse(empJSON);
    let empReturn;
    emp.forEach((employee) => {
        if(employee.id == req.params.id){
            empReturn = employee;
        }
    });
    if(empReturn != undefined){
        let fields = Object.keys(empReturn);
        fields.forEach((field) => {
            if(field = req.params.field){
                fieldToFind = empReturn[`${field}`];
            }
        });
    }
    fieldToFind != undefined ?  res.status(200).send(fieldToFind) :
                                res.status(404).send({message: `Employee not found`});
});

router.post('/perPerson', (req, res) => {
    let employee = {};
    employee.id = Math.random().toString(36).substring(2, 12);
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.company = req.body.company;
    employee.city = req.body.company;
    employee.tasks = req.body.tasks;
    fs.readFile('employee.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        } else {
            let emp = JSON.parse(data);
            console.log(emp)
            emp.push(employee);
            let json = JSON.stringify(emp);
            fs.writeFile('employee.json', json, 'utf8', (err, data) =>{
                if(err) throw err;
                else{
                    res.status(200).send({Result: {message: `The employee was created`, employee}});
                }

            });
        }
    });
});
 
router.post('/perPerson/batch', (req, res) => {
    fs.readFile('employee.json', 'utf8', (err, data) => {
        if(err){
            res.status(500).send({message: "Internal Sever Error"});
        } else {
            let employeesBatch = req.body;
            let emp = JSON.parse(data);
            employeesBatch.forEach(
                (empl) => {
                    let newEmployee = {};
                    newEmployee.id = Math.random().toString(36).substring(2, 12);
                    newEmployee.firstName = empl.firstName;
                    newEmployee.lastName = empl.lastName;
                    newEmployee.company = empl.company;
                    newEmployee.city = empl.company;
                    newEmployee.tasks = empl.tasks;
                    emp.push(newEmployee);
                }
            );
            let json = JSON.stringify(emp);
            fs.writeFile('employee.json', json, 'utf8', (err, data) =>{
                if(err) throw err;
                else{
                    res.status(200).send({Result: {message: `The employees were created`, employeesBatch}});
                }

            });
        }
    });
});

router.put('/perPerson/:id', (req, res) => {
    const empJSON = fs.readFileSync('./employee.json', 'utf-8', (err, data) => {
        if (err) throw err;
	});
    let emp = JSON.parse(empJSON);
    let requestBody = JSON.stringify(req.body)
    let empTemp = JSON.parse(requestBody);
    let empReturn = {};
    emp.forEach((employee, index) => {
        if(employee.id == req.params.id){
            empReturn.id = req.params.id;
            empReturn.firstName = empTemp.firstName;
            empReturn.lastName = empTemp.lastName;
            empReturn.company = empTemp.company;
            empReturn.city = empTemp.company;
            empReturn.tasks = empTemp.tasks;
            emp[index] = empReturn;
        }
    });
    fs.writeFile('employee.json', JSON.stringify(emp), 'utf8', (err, data) =>{
        if(err) res.status(500).send({message: `Internal Server Error ${err}`});
    });
    let updatedEmployee = req.body;
    empReturn != undefined ?  res.status(200).send({Result: {message: `The employee was updated`}, updatedEmployee}) :
            res.status(404).send({message: 'Employee not found'});
});

router.delete('/perPerson/:id', (req, res) => {
    const empJSON = fs.readFileSync('./employee.json', 'utf-8', (err, data) => {
        if (err) throw err;
	});
    let emp = JSON.parse(empJSON);
    let deletedEmployee;
    emp.forEach((employee, index) => {
        if(employee.id == req.params.id){
            deletedEmployee = employee;
            emp.splice(index, 1);
        }
    });
    fs.writeFile('employee.json', JSON.stringify(emp), 'utf8', (err, data) =>{
        if(err) res.status(500).send({message: `Internal Server Error ${err}`});
    });

    deletedEmployee != undefined ?  res.status(200).send({Result: {message: `The employee was deleted`}, deletedEmployee}) :
                                    res.status(404).send({message: 'Employee not found'});
});

app.use('/api/v1', router);
app.listen(port, () => {
    console.log(`API REST running on: ${port}`)
})
