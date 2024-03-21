import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

describe('Teste as funcionalidades da página \'Favorite Pokémon\'', () => {
  it('É exibido na tela a mensagem \'No favorite pokemon found\' caso não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const nonePokemonText = screen.getByText(/no favorite pokémon found/i);

    expect(nonePokemonText).toBeInTheDocument();
  });
  it('Se é exibido apenas os Pokémon favoritados.', async () => {
    const { user } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    await user.click(moreDetailsLink);
    const favoriteCheckbox = screen.getByText(/pokémon favoritado\?/i);
    await user.click(favoriteCheckbox);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(favoritesLink);

    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuType = screen.getByText(/electric/i);
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);

    const charmanderName = 'Charmander';
    const charmanderNameElement = screen.queryByText(charmanderName);
    const charmanderType = (/fire/i);
    const charmanderTypeElement = screen.queryByText(charmanderType);
    const charmanderWeight = (/average weight: 8\.5 kg/i);
    const charmanderWeightElement = screen.queryByText(charmanderWeight);

    expect(pikachuName).toBeInTheDocument();
    expect(pikachuType).toBeInTheDocument();
    expect(pikachuWeight).toBeInTheDocument();
    expect(charmanderNameElement).not.toBeInTheDocument();
    expect(charmanderTypeElement).not.toBeInTheDocument();
    expect(charmanderWeightElement).not.toBeInTheDocument();
  });
});
