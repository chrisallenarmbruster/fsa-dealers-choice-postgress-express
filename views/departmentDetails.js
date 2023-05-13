const html = require("html-template-tag")

module.exports = (department, employees) => {
  // console.log(department)
  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>Acme Corp</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="news-list">
          <header>
            Acme Corp <a href="/departments">Departments</a>
            <a href="/employees">Employees</a>
          </header>
          <div class="news-item">
            <h3>${department.departmentname}</h3>
            <p>Department Number: ${department.departmentnumber}</p>
            <p>Description: ${department.departmentdescription}</p>
            <hr />
            <div>
              <h3>Department Employees</h3>
              ${employees.map(
                (employee) => html` <div class="news-item">
                  <p>
                    <a href="/employees/${employee.employeeid}"
                      >$${employee.firstname} ${employee.lastname}</a
                    >
                    (${employee.jobtitle})
                  </p>
                </div>`
              )}
            </div>
          </div>
        </div>
      </body>
    </html>`
}
