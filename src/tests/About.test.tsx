import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

describe('Teste se na página about contém as informações sobre a Pokédex.', () => {
  it('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const headingEl = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(headingEl).toBeInTheDocument();
  });

  it('A página contém uma imagem com o atributo \'src\': https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<App />, { route: '/about' });
    const imageEl = screen.getByAltText(/pokédex/i);

    expect(imageEl).toBeInTheDocument();
    expect(imageEl.getAttribute('src')).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
