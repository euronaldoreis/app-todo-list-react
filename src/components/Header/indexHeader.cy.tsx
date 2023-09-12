import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../../src/context/AuthContext';
import Header from './index'

describe('<Header />', () => {
  beforeEach(() => {
    const userMock = {
      email: 'ronaldoreisdev@gmail.com',
      name: 'Ronaldo Reis',
      photoURL: 'https://i.pinimg.com/280x280_RS/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg'
    }
    cy.mount(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )
  })
  it('should open profile menu and sign out', () => {
    
    // Verificar se o botão de perfil está visível
    cy.get('[data-testid=menu-profile]').should('be.visible');

    // Clicar no botão de perfil para abrir o menu
    cy.get('[data-testid=menu-profile]').click();

    // Verificar se o menu de perfil está aberto
    cy.get('#menu-appbar').should('be.visible');

    // Clicar no item "Sair" do menu de perfil
    cy.contains('Sair').click();

    // Verificar se a página foi redirecionada para a página de login
    cy.url().should('include', '/');
  });
});