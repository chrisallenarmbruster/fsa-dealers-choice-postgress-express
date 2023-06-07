const router = require("express").Router()
const client = require("../db")
const {
  departmentDetails,
  departmentList,
  employeeDetails,
  employeeList,
} = require("../views")

//root redirect
router.get("/", (req, res, next) => {
  res.redirect("/departments")
})

router.get("/departments", async (req, res, next) => {
  try {
    const departments = await client.query(
      `SELECT * FROM departments ORDER BY departmentName`
    )
    res.status(200).send(departmentList(departments.rows))
  } catch (err) {
    err.message = "Database Query Failed"
    next(err)
  }
})

router.get("/departments/:id", async (req, res, next) => {
  try {
    const department = await client.query(
      `SELECT * FROM departments WHERE departmentid = $1`,
      [req.params.id]
    )

    //consider making standalone standalone function w/ parameters for reuse
    const employees = await client.query(
      `SELECT * FROM employees WHERE departmentnumber = $1`,
      [department.rows[0].departmentnumber]
    )
    res.status(200).send(departmentDetails(department.rows[0], employees.rows))
  } catch (err) {
    err.message = "Database Query Failed"
    next(err)
  }
})

router.get("/employees", async (req, res, next) => {
  try {
    const employees = await client.query(
      `SELECT * FROM employees JOIN departments ON employees.departmentnumber = departments.departmentnumber ORDER BY employees.lastname`
    )
    res.status(200).send(employeeList(employees.rows))
  } catch (err) {
    err.message = "Database Query Failed"
    next(err)
  }
})

router.get("/employees/:id", async (req, res, next) => {
  try {
    const employee = await client.query(
      `SELECT * FROM employees JOIN departments ON employees.departmentnumber = departments.departmentnumber WHERE employeeid = $1`,
      [req.params.id]
    )
    res.status(200).send(employeeDetails(employee.rows[0]))
  } catch (err) {
    err.message = "Database Query Failed"
    next(err)
  }
})

module.exports = router
