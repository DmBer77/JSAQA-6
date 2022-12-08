it.skip('Should successfully login', () => {
    cy.visit('localhost:3000');
    cy.contains('Log in').click();
    cy.get('#mail').type('test@test.com');
    cy.get('#pass').type('test');
    cy.contains('Submit').click();
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
});

it.skip('Should unsuccessfully login', () => {
    cy.visit('localhost:3000');
    cy.contains('Log in').click();
    cy.get('#mail').type('test@test.com');
    cy.get('#pass').type('badpass');
    cy.contains('Submit').click();
    cy.contains('Неправильая почта или пароль').should('be.visible');
});

it.skip('Should unsuccessfully login', () => {
    cy.visit('localhost:3000');
    cy.contains('Log in').click();
    cy.get('#mail').type('badname@test.com');
    cy.get('#pass').type('test');
    cy.contains('Submit').click();
    cy.contains('Неправильая почта или пароль').should('be.visible');
});

describe('add books', () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
        cy.contains('Log in').click();
        cy.get('#mail').type('test@test.com');
        cy.get('#pass').type('test');
        cy.contains('Submit').click();
    });

    afterEach(() => {
        cy.get('.ml-auto > .ml-2').click();
    });

    it('Should add one book successfully ', () => {
        cy.get('.p-0 > .btn').click();
        cy.get('#title').type('Идиот');
        cy.get('#authors').type('Достоевский Ф.М.');
        cy.get('#favorite').click();
        cy.get('form > .ml-2').click();
        cy.contains('Идиот').should('be.visible');
    });

    it('Should add two books successfully', () => {
        cy.get('.p-0 > .btn').click();
        cy.get('#title').type('Евгений Онегин');
        cy.get('#authors').type('Пушкин А.С.');
        cy.get('#favorite').click();
        cy.get('form > .ml-2').click();

        cy.get('.p-0 > .btn').click();
        cy.get('#title').type('Мцыри');
        cy.get('#authors').type('Лермонтов М.Ю.');
        cy.get('#favorite').click();
        cy.get('form > .ml-2').click();

        cy.get('.card-title', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Мцыри');
    });

    it('Should add one book from two successfully (using button "cancel")', () => {
        cy.get('.p-0 > .btn').click();
        cy.get('#title').type('Тихий Дон');
        cy.get('#authors').type('Шолохов М.А.');
        cy.get('#favorite').click();
        cy.get('form > .ml-2').click();

        cy.get('.p-0 > .btn').click();
        cy.get('#title').type('Как закалялась сталь');
        cy.get('#authors').type('Островский Н.А.');
        cy.get('#favorite').click();
        cy.get('form > .btn-dark').click();

        cy.get('.card-title', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Тихий Дон');
    });
});
