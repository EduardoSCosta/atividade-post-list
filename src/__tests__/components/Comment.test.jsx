import { render, screen } from '@testing-library/react';
import Comment from '../../components/Comment';

describe('<Comment />', () => {
  describe('When the component is rendered', () => {
    const comment = {
        id: 1,
        email: 'email@test.com',
        name: 'user test',
        body: 'comment test'
      }

    it('should show the comment email passed in props', () => {
      render(<Comment comment={comment} />)

      const commentEmailElement = screen.getByRole('heading', { name: /email@test.com/i });

      expect(commentEmailElement).toBeInTheDocument();
    });

    it('should show the comment name passed in props', () => {
      render(<Comment comment={comment} />)

      const commentNameElement = screen.getByText(/comment test/i);

      expect(commentNameElement).toBeInTheDocument();
    });
  });
});
