describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:8081/api/testing/reset');
    const user = {
      name: 'Chris',
      username: 'chris',
      password: '!@1Abc12313qsdqdQDQWDQWDde',
    };
    const otherUser = {
      name: 'Other user',
      username: 'other',
      password: '!@1Abc12313qsdqdQDQWDQWDde',
    };
    cy.request('POST', 'http://localhost:8081/api/users/', user);
    cy.request('POST', 'http://localhost:8081/api/users/', otherUser);
    cy.visit('http://localhost:3000');
  });
  it('Login form is shown', function () {
    cy.contains('Blogs app');
    cy.get('#username').should('have.attr', 'name', 'username');
    cy.get('#password').should('have.attr', 'name', 'password');
    cy.contains(
      'Blog app, constructed for the fullstackopen course about React'
    );
  });
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('chris');
      cy.get('#password').type('!@1Abc12313qsdqdQDQWDQWDde');
      cy.contains('Login').click();

      cy.contains('You are logged in as chris');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('chris');
      cy.get('#password').type('wrong');
      cy.contains('Login').click();

      cy.get('.danger')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(180, 0, 0)')
        .and('have.css', 'border', '3px solid rgb(180, 0, 0)');

      cy.get('html').should('not.contain', 'You are logged in as chris');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'other',
        password: '!@1Abc12313qsdqdQDQWDQWDde',
      });
      cy.createBlog({
        title: 'Other Blog',
        author: 'Other user',
        url: 'https://www.cypress.io/',
      });
      cy.login({
        username: 'chris',
        password: '!@1Abc12313qsdqdQDQWDQWDde',
      });
      cy.createBlog({
        title: 'First Blog',
        author: 'First Author',
        url: 'https://www.cypress.io/',
      });
      cy.createBlog({
        title: 'Second Blog',
        author: 'Second Author',
        url: 'https://www.cypress.io/',
      });
      cy.createBlog({
        title: 'Third Blog',
        author: 'Third Author',
        url: 'https://www.cypress.io/',
      });
    });
    it('A blog can be created', function () {
      cy.contains('New Blog').click();
      cy.createBlog({
        title: 'Cypress is amazing',
        author: 'Cypress',
        url: 'https://www.cypress.io/',
      });
      cy.contains('Cypress is amazing');
    });
    it('A new blog can be liked', function () {
      cy.contains('First Blog').parent().contains('View details').click();
      cy.contains('First Blog')
        .parent()
        .find('button')
        .contains('Like')
        .click();
      cy.contains('First Blog').parent().contains('Likes: 1');
    });
    it('A created blog can be deleted by the user owning it', function () {
      cy.contains('First Blog')
        .parent()
        .find('button')
        .contains('Delete')
        .click();
      cy.get('html').should('not.contain', 'First Blog');
      cy.contains('Blog post successfully deleted');
    });
    it('A blog from another user can not be deleted', function () {
      cy.contains('Other Blog').parent().should('not.contain', 'Delete');
    });

    it('Blogs are sorted by most liked to least likes', function () {
      cy.get('.list-of-blogs').first().should('contain', 'Third Blog');
      cy.contains('First Blog').parent().contains('View details').click();
      cy.contains('First Blog')
        .parent()
        .find('button')
        .contains('Like')
        .click();

      cy.contains('Second Blog').parent().contains('View details').click();
      cy.contains('Second Blog')
        .parent()
        .find('button')
        .contains('Like')
        .click()
        .wait(200)
        .click();

      cy.contains('Third Blog').parent().contains('View details').click();
      cy.contains('Third Blog')
        .parent()
        .find('button')
        .contains('Like')
        .click()
        .wait(200)
        .click()
        .wait(200)
        .click();

      cy.contains('Other Blog').parent().contains('View details').click();
      cy.contains('Other Blog')
        .parent()
        .find('button')
        .contains('Like')
        .click()
        .wait(200)
        .click()
        .wait(200)
        .click()
        .wait(200)
        .click();
      cy.get('.list-of-blogs').first().should('contain', 'Other Blog');
      cy.get('.list-of-blogs>div').eq(1).should('contain', 'Third Blog');
      cy.get('.list-of-blogs>div').eq(2).should('contain', 'Second Blog');
      cy.get('.list-of-blogs>div').eq(3).should('contain', 'First Blog');
    });
  });
});
