import { render, screen } from '@testing-library/react';
import App from '../App';

describe('<Post />', () => {
  describe('When the component is rendered', () => {

    it('should show the page title', () => {
      render(<App />)

      const pageTitleElement = screen.getByRole('heading', { name: /Post List/i });
      
      expect(pageTitleElement).toBeInTheDocument();
    });
  });
});
