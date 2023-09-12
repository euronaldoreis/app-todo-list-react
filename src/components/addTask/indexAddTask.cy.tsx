import React from 'react'
import AddTask from './index';

describe('<AddTask />', () => {
  it('should render correctly and create a task', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddTask />);

    cy.get('input[placeholder="Digite um nome para sua task"]').as('inputField');
  
    cy.get('@inputField').should('be.visible');

    cy.get('@inputField').type('Minha Nova Tarefa');

    // cy.window().then((win: { handleCreate: (arg0: string) => void; }) => {
    //   win.handleCreate('Minha Nova Tarefa');
    // });

    cy.window().its('handleCreate').should('be.calledWith', 'Minha Nova Tarefa');

    cy.get('@inputField').should('have.value', '');
  })
})