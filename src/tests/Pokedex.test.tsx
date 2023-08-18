import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';
import pokemonList from '../data';

const dataTestName = 'pokemon-type-button';

describe('Testa as funcionalidades do componente <Pokedex.tsx />', () => {
  it('A página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />);
    const encounteredTitle = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });

    expect(encounteredTitle).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado e é mostrado apenas um Pokémon por vez.', async () => {
    const { user } = renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    const clickNextPokemon = async (index: any) => {
      if (index >= pokemonList.length) {
        const firstPokemonName = screen.getByText(pokemonList[0].name);
        const lastPokemonName = screen
          .queryByText(pokemonList[pokemonList.length - 1].name);
        expect(firstPokemonName).toBeInTheDocument();
        expect(lastPokemonName).not.toBeInTheDocument();
        return;
      }

      const currentPokemon = pokemonList[index];
      const currentPokemonName = screen.getByText(currentPokemon.name);
      expect(currentPokemonName).toBeInTheDocument();

      if (index > 0) {
        const previousPokemon = pokemonList[index - 1];
        const previousPokemonName = screen.queryByText(previousPokemon.name);
        expect(previousPokemonName).not.toBeInTheDocument();
      }

      await user.click(nextBtn);
      await clickNextPokemon(index + 1);
    };

    await clickNextPokemon(0);
  });

  it('A Pokédex tem os botões de filtro:', async () => {
    const { user } = renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    const bugTypeBtn = screen.getByRole('button', { name: /bug/i });

    await user.click(bugTypeBtn);

    const caterpieName = screen.getByText(/caterpie/i);
    const caterpieImage = screen.getByRole('img', { name: /caterpie sprite/i });
    expect(caterpieName).toBeInTheDocument();
    expect(caterpieImage).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    const poisonTypeBtn = screen.getByRole('button', { name: /poison/i });

    await user.click(poisonTypeBtn);

    const ekansName = screen.getByText(/ekans/i);
    const ekansWeight = screen.getByText(/average weight: 6\.9 kg/i);
    const ekansImage = screen.getByRole('img', { name: /ekans sprite/i });
    expect(ekansName).toBeInTheDocument();
    expect(ekansWeight).toBeInTheDocument();
    expect(ekansImage).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    const dragonTybeBtn = screen.getByRole('button', { name: /dragon/i });
    await user.click(dragonTybeBtn);
    expect(screen.getByText(pokemonList[8].name)).toBeInTheDocument();

    const dragonairImage = screen.getByRole('img', { name: /dragonair sprite/i });
    expect(dragonairImage).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    const typeBtns = screen.getAllByTestId(dataTestName);
    typeBtns.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });
    expect(allBtn).toBeInTheDocument();

    expect(allBtn).not.toHaveAttribute('data-testid', dataTestName);
  });
  it('A Pokédex contém um botão com o nome \'All\' para resetar o filtro:', async () => {
    const { user } = renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toHaveTextContent('All');

    const psychicBtn = screen.getByRole('button', { name: /psychic/i });

    await user.click(psychicBtn);

    const alakazamName = screen.getByText(/alakazam/i);
    expect(alakazamName).toBeInTheDocument();

    await user.click(allBtn);
    expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();

    const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImage).toBeInTheDocument();
    expect(screen.queryByText(pokemonList[7].name)).not.toBeInTheDocument();
  });
});
