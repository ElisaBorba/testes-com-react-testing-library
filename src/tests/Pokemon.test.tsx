import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

describe('Testa o componente <Pokemon.tsx />', async () => {
  it('A imagem do Pokémon tem o src correto e o alt: <name> sprite', async () => {
    renderWithRouter(<App />);

    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pikachuLink = screen.getByRole('link', { name: /more details/i });

    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pikachuName).toBeInTheDocument();
    expect(pikachuImage).toBeInTheDocument();
    expect(pikachuWeight).toBeInTheDocument();
    expect(pikachuImage.getAttribute('src')).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuImage.getAttribute('alt')).toBe('Pikachu sprite');
    expect(pikachuLink).toBeInTheDocument();
  });

  it('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido', async () => {
    const { user } = renderWithRouter(<App />);

    const pikachuLink = screen.getByRole('link', { name: /more details/i });
    expect(pikachuLink).toBeInTheDocument();

    await user.click(pikachuLink);
    expect(window.location.pathname).toBe('/pokemon/25');

    const pikachuDetailsTitle = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pikachuDetailsTitle).toBeInTheDocument();
  });

  it('Existe um ícone de estrela somente nos Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/25' });

    const checkboxFavoritePokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

    const starPicOff = screen.queryByAltText('Pikachu is marked as favorite');
    expect(starPicOff).not.toBeInTheDocument();

    await user.click(checkboxFavoritePokemon);

    const starPicShow = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starPicShow).toBeInTheDocument();
    expect(starPicShow.getAttribute('src')).toBe('/star-icon.png');
    expect(starPicShow.getAttribute('alt')).toBe('Pikachu is marked as favorite');

    await user.click(checkboxFavoritePokemon);

    expect(starPicOff).not.toBeInTheDocument();
  });
});
