import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";
import api from '../api/api';
import App from '../App';

describe('<App />', () => {
  describe('When the component is rendered', () => {
    let mock;

    beforeAll(() => {
      mock = new MockAdapter(api);
    });

    afterEach(() => {
      mock.reset();
    });

    it('should show the page title', () => {
      const posts = [{
        id: 1,
        userId: 1,
        title: 'post title',
        body: 'post body'
      }];

      const comments = [{
        id: 2,
        postId: 1,
        email: 'email@test.com',
        name: 'user test',
        body: 'comment test'
      }];

      const user = {
        id: 1,
        name: 'test user'
      }

      mock.onGet(`posts`).reply(200, posts);

      posts.map(post => mock.onGet(`posts/${post.id}/comments`).reply(200, comments));

      posts.map(post => mock.onGet(`users/${post.userId}`).reply(200, user));


      render(<App totalPosts={1} pageLimit={20} />);

      const pageTitleElement = screen.getByRole('heading', { name: /Post List/i });

      expect(pageTitleElement).toBeInTheDocument();

      return waitForElementToBeRemoved(screen.getByRole('heading', { name: /Loading.../i }));
    });
  });
});
