Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:8081/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ author, title, url }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8081/api/blogs',
    body: {
      author,
      title,
      url,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  });
  cy.visit('http://localhost:3000');
});
