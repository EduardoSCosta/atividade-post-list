import { render, screen } from '@testing-library/react';
import Post from '../../components/Post';

describe('<Post />', () => {
  describe('When the component is rendered', () => {
    const post = {
      title: 'post title',
      body: 'post body',
      user: {
        name: 'test user'
      },
      comments: [{
        id: 1,
        email: 'email@test.com',
        name: 'user test',
        body: 'comment test'
      }]
    }

    it('should show the post title passed in props', () => {
      render(<Post post={post} />)

      const postTitleElement = screen.getByRole('heading', { name: /post title/i });

      expect(postTitleElement).toBeInTheDocument();
    });

    it('should show the post body passed in props', () => {
      render(<Post post={post} />)

      const postBodyElement = screen.getByText(/post body/i);

      expect(postBodyElement).toBeInTheDocument();
    });
  });
});
