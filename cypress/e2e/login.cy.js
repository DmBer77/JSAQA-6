it.skip('Should successfully login', () => {
    cy.visit('/');
    cy.contains('Log in').click();
    cy.get('#mail').type('test@test.com');
    cy.get('#pass').type('test');
    cy.contains('Submit').click();
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
});

describe('add books', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login('test@test.com', 'test');
    });

    afterEach(() => {
        cy.get('.ml-auto > .ml-2').click();
    });

    it('Should add one book successfully ', () => {
        cy.addBook('Идиот', 'Достоевский Ф.М.', '1');
        cy.contains('Идиот').should('be.visible');
    });

    it('Should add two books successfully', () => {
        cy.addBook('Евгений Онегин', 'Пушкин А.С.', '1');
        cy.addBook('Мцыри', 'Лермонтов М.Ю.', '1');

        cy.get('.card-title', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Мцыри');
    });

    it('Should add one book from two successfully (using button "cancel")', () => {
        cy.addBook('Тихий Дон', 'Шолохов М.А.', '1');
        cy.addBook('Как закалялась сталь', 'Островский Н.А.', '0');

        cy.get('.card-title', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Тихий Дон');
    });
});
