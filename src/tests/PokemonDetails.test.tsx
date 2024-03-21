import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

test('', () => {});

describe('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  it('Existe um ícone de estrela somente nos Pokémon favoritados', async () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });

    const title = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    const summaryDescription = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    const gameTitle = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });

    const locationA = screen.getByText(/kanto viridian forest/i);
    const locationB = screen.getByText(/kanto power plant/i);
    const locationMap = screen.getAllByAltText('Pikachu location');

    expect(locationMap[0]).toBeInTheDocument();
    expect(locationMap[0].getAttribute('src')).toBe(
      'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locationMap[0].getAttribute('alt')).toBe('Pikachu location');
    expect(locationB).toBeInTheDocument();
    expect(locationA).toBeInTheDocument();
    expect(gameTitle).toBeInTheDocument();
    expect(summaryDescription).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
