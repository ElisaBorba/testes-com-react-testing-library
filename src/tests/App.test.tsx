import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  it('É exibido na tela um link com o texto: Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });
  it('É exibido na tela um link com o texto: About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });
  it('É exibido na tela um link com o texto: Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritesLink).toBeInTheDocument();
  });
});
