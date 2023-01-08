describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kaarle Koodari',
      username: 'KaarleJ',
      password: 'salasana',
      blogs: [],
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form is shown', function() {
    cy.get('#loginform')
  })

  describe('Login', function() {
    it('user can login', function () {
      cy.get('#username').type('KaarleJ')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
      cy.contains('Logged in as Kaarle Koodari')
    })
    it('login will fail with wrong credentials', function() {
      cy.get('#username').type('KaarleJ')
      cy.get('#password').type('julkisana')
      cy.contains('login').click()
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)').and('contain', 'wrong credentials')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'KaarleJ', password: 'salasana' })
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('localhost:3000')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })

    describe('when blogs have been created', function() {
      beforeEach(function() {
        cy.create('cypressblog', 'cypress', 'www.edgerunning.nc')
        cy.create('Hello World', 'machine', 'www.mozilla.org')
        cy.create('Unexpected Journey', 'Bilbo Baggins', 'www.middle-earth.com')
        cy.visit('http://localhost:3000')
      })

      it('blog can be liked', function() {
        cy.contains('cypressblog').contains('show').click()
        cy.contains('www.edgerunning.nc').contains('likes 0')
        cy.contains('www.edgerunning.nc').contains('like').click()
        cy.contains('www.edgerunning.nc').contains('likes 1')
      })

      it('Owner of the blog can delete a blog', function() {
        cy.contains('cypressblog').contains('show').click()
        cy.contains('www.edgerunning.nc').get('#delete').click()
        cy.get('.notification').should('contain', 'Removed blog cypressblog by cypress from the collection')
      })

      it('A user cannot delete other users blogs', function() {
        cy.contains('logout').click()
        const user2 = {
          name: 'Adam Smasher',
          username: 'AdamS',
          password: 'cybergonk',
          blogs: [],
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3000')
        cy.login({ username: 'AdamS', password: 'cybergonk' })
        cy.contains('cypressblog').contains('show').click()
        cy.contains('cypressblog').contains('delete').should('not.exist')

      })

      it('blogs are sorted', function() {
        cy.contains('cypressblog').contains('show').click()
        cy.contains('www.edgerunning.nc').contains('like').click()
        cy.contains('www.edgerunning.nc').contains('like').click()
        cy.contains('www.edgerunning.nc').contains('like').click()
        cy.contains('Unexpected Journey').contains('show').click()
        cy.contains('www.middle-earth.com').contains('like').click()
        cy.contains('www.middle-earth.com').contains('like').click()
        cy.contains('Hello World').contains('show').click()
        cy.contains('www.mozilla.org').contains('like').click()
        cy.visit('http://localhost:3000')
        cy.get('.blog').eq(0).should('contain', 'cypressblog')
        cy.get('.blog').eq(1).should('contain', 'Unexpected Journey')
        cy.get('.blog').eq(2).should('contain', 'Hello World')
      })
    })

  })
})