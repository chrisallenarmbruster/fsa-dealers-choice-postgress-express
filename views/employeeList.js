const html = require("html-template-tag")

module.exports = (employees) => {
  console.log(employees)
  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>Acme Corp</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <div class="news-list">
          <header>
            Acme Corp
            <a href="/departments">Departments</a>
            <a href="/employees">Employees</a>
          </header>
          <div class="news-item">
            <h3>All Employees</h3>
            ${employees.map(
              (employee) => html` <div class="news-item">
                <p>
                  <a href="/employees/${employee.employeeid}"
                    >$${employee.firstname} ${employee.lastname}</a
                  >
                  <span class="news-position"
                    >(ID: ${employee.employeeid})</span
                  >
                  (Dept:
                  <a href="/departments/${employee.departmentid}"
                    >${employee.departmentnumber}</a
                  >)
                </p>
              </div>`
            )}
          </div>
        </div>
      </body>
    </html>`
}
