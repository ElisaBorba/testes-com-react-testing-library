import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './utils/renderWithRouter';

describe('Teste as funcionalidades de uma página não encontrada', () => {
  it('Se a página contém um heading h2 com o texto: Page requested not found.', () => {
    renderWithRouter(<App />, { route: '/anything' });
    const headingEl = screen.getByRole('heading', { level: 2, name: /page requested not found/i });

    expect(headingEl).toBeInTheDocument();
  });

  it('Existe uma imagem com o \'alt\': Clefairy pushing buttons randomly with text I have no idea what i\'m doing', () => {
    renderWithRouter(<App />, { route: '/anything' });
    const imageEl = screen.getByRole('img');

    expect(imageEl).toBeInTheDocument();
    expect(imageEl.getAttribute('alt')).toBe('Clefairy pushing buttons randomly with text I have no idea what i\'m doing');

    expect(imageEl.getAttribute('src')).not.toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
