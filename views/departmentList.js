const html = require("html-template-tag")

module.exports = (departments) => {
  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>Acme Corp</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="news-list">
          <header>
            Acme Corp: Department Listing |
            <a href="/departments">Departments</a> |
            <a href="/employees">Employees</a>
          </header>
          <div class="news-item">
            <h3>All Departments</h3>
            ${departments.map(
              (department) => html` <div class="news-item">
                <p>
                  <span class="news-position"
                    >${department.departmentnumber}</span
                  >
                  <a href="/departments/${department.departmentid}"
                    >${department.departmentname}</a
                  >
                </p>
              </div>`
            )}
          </div>
        </div>
      </body>
    </html>`
}
