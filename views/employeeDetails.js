const html = require("html-template-tag")

module.exports = (employee) => {
  console.log(employee)
  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>Acme Corp</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="news-list">
          <header>
            Acme Corp
            <a href="/departments">Departments</a>
            <a href="/employees">Employees</a>
          </header>
          <div class="news-item">
            <h3>${employee.lastname}, ${employee.firstname}</h3>
            <p>Employee ID: ${employee.employeeid}</p>

            <p>
              Department Number:
              <a href="/departments/${employee.departmentid}"
                >${employee.departmentnumber}</a
              >
            </p>

            <p>Job: ${employee.jobtitle}</p>
            <p>Phone: ${employee.phone}</p>
            <p>Email: ${employee.email}</p>
          </div>
        </div>
      </body>
    </html>`
}
