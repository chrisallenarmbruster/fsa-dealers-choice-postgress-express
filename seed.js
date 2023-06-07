//create and seed a mock HR database of employees and departments
//Noticed terminal would not return to prompt if I didn't do client.end()
//Also found out hard way that postgress will lowercase my column names if not quoted,
//I adjusted for that in the rest of application, but if to do again,
//I would use snake case rather than camel case.

const { faker } = require("@faker-js/faker")
const pg = require("pg")
const _ = require("lodash")
let client = new pg.Client("postgres://localhost")

function fakeEmployee(companyName) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    firstName: firstName.replace("'", "''"),
    lastName: lastName.replace("'", "''"),
    jobTitle: faker.person.jobTitle(),
    phone: faker.phone.number(),
    email: faker.internet.email({
      firstName: firstName,
      lastName: lastName,
      provider: companyName,
      allowSpecialCharacters: false,
    }),
  }
}

function fakeCompanyDepartment() {
  return {
    departmentName: `${_.capitalize(
      faker.company.buzzAdjective()
    )} ${faker.commerce.department()}`,
    departmentNumber: faker.number.int({ min: 10000000, max: 99999999 }),
    departmentDescription: faker.lorem.paragraph(),
  }
}

async function createTables() {
  client = new pg.Client("postgres://localhost/hr_mock")
  await client.connect()
  await client.query(
    "CREATE TABLE employees(employeeId SERIAL PRIMARY KEY, firstName VARCHAR(50), lastName VARCHAR(50), jobTitle VARCHAR(100), phone VARCHAR(30), email VARCHAR(75), departmentNumber INTEGER)"
  )
  await client.query(
    "CREATE TABLE departments(departmentId SERIAL PRIMARY KEY, departmentName VARCHAR(75), departmentNumber INTEGER, departmentDescription TEXT)"
  )
  client.end()
  console.log("Tables created.")
}

async function seedTables() {
  client = new pg.Client("postgres://localhost/hr_mock")
  await client.connect()
  for (let d = 0; d < 30; d++) {
    const department = fakeCompanyDepartment()
    console.log(department)
    const departmentQuery = `INSERT INTO departments (departmentName,departmentNumber,departmentDescription) VALUES ('${department.departmentName}', ${department.departmentNumber}, '${department.departmentDescription}')`
    await client.query(departmentQuery)
    let numEmployees = Math.floor(Math.random() * 26) + 5
    for (let e = 0; e < numEmployees; e++) {
      const employee = fakeEmployee("acme.com")
      console.log(employee)
      const employeeQuery = `INSERT INTO employees (firstName,lastName,jobTitle,phone,email,departmentNumber) VALUES ('${employee.firstName}','${employee.lastName}','${employee.jobTitle}','${employee.phone}','${employee.email}', ${department.departmentNumber})`
      await client.query(employeeQuery)
    }
  }

  client.end()
  console.log("Tables seeded.")
}

async function setUpDb(dbName) {
  //have to use a databaseless connection string in order to drop and recreate database if exists
  client = new pg.Client("postgres://localhost")
  await client.connect()
  await client.query(`DROP DATABASE IF EXISTS ${dbName};`)
  await client.query(`CREATE DATABASE ${dbName};`)
  client.end()
  console.log("Database created.")

  await createTables()
  await seedTables()

  console.log("Setup completed")
}

setUpDb("hr_mock")
