/* eslint-disable quotes */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('blogist', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('create', (title, author, url) => {
  const blogist = JSON.parse(localStorage.getItem('blogist'))

  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${blogist.token}`,
    },
    body: {
      title: title,
      author: author,
      url: url,
      userId: blogist.userId,
    },
  }).then(() => {
    cy.visit('http://localhost:3000')
  })
})
