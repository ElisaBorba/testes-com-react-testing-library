import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

describe('Testa o componente <Pokemon.tsx />', async () => {
  it('imagem do Pokémon tem o src correto e o alt: <name> sprite', async () => {
    const { user } = renderWithRouter(<App />);

    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pikachuLink = screen.getByRole('link', { name: /more details/i });

    expect(pikachuName).toBeInTheDocument();
    expect(pikachuImage).toBeInTheDocument();
    expect(pikachuWeight).toBeInTheDocument();
    expect(pikachuImage.getAttribute('src')).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuImage.getAttribute('alt')).toBe('Pikachu sprite');
    expect(pikachuLink).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    await user.click(nextBtn);
    await user.click(nextBtn);

    const caterpieName = screen.getByText(/caterpie/i);
    const caterpieImage = screen.getByRole('img', { name: /caterpie sprite/i });
    const caterpieWeight = screen.getByText(/average weight: 2\.9 kg/i);

    expect(caterpieName).toBeInTheDocument();
    expect(caterpieImage).toBeInTheDocument();
    expect(caterpieWeight).toBeInTheDocument();

    expect(caterpieImage.getAttribute('src')).toBe('https://archives.bulbagarden.net/media/upload/8/83/Spr_5b_010.png');
    expect(caterpieImage.getAttribute('alt')).toBe('Caterpie sprite');
  });
});
