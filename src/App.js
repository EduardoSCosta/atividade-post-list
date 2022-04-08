import { useEffect, useState } from 'react';
import api from './api';
import Post from './components/Post';

const TOTAL_POSTS = 95;
const PAGE_DEFAULT_LIMIT = 20;

function App({ totalPosts = TOTAL_POSTS, pageLimit = PAGE_DEFAULT_LIMIT }) {

  const [posts, setPosts] = useState([]);

  const pagination = () => {
    const totalPages = Math.floor(totalPosts / pageLimit);
    const lastPageLimit = totalPosts % pageLimit;

    return [...new Array(totalPages).fill(pageLimit), lastPageLimit];
  };

  const getCurrentPagePosts = (index, currentPageLimit) => () => {
    return api.get('posts', {
      params: {
        _start: index * pageLimit,
        _limit: currentPageLimit
      }
    })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
  }

  const getPostsComments = (postId) => () => {
    return api.get(`posts/${postId}/comments`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
  }

  const getUser = (userId) => () => {
    return api.get(`users/${userId}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
  }

  const getAllPosts = () => {
    return pagination().reduce((currentPosts, currentPageLimit, index) => {
      const newPostsList = getCurrentPagePosts(index, currentPageLimit);

      const addComments = newPostsList().then((response) => {
        return Promise.all(response.map((post) => {
          const comments = getPostsComments(post.id);

          return comments().then((response) => { return { ...post, comments: response } });
        }))
      });

      return currentPosts.then((previousPosts) => addComments
        .then((newPosts) => [...previousPosts, ...newPosts]));
    }, Promise.resolve([]))
      .then((posts) => {
        const usersIds = [...new Set(posts.map((post) => { return post.userId; }))];

        const users = Promise.all(usersIds.map(userId => {
          const user = getUser(userId);

          return user().then((response) => response);
        }))

        return users.then(users => {
          return posts.map(post => {
            return { ...post, user: users.find(user => user.id === post.userId) }
          })
        })
      })
      .then(setPosts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <h1 className='title'>Post List</h1>
      {posts.length === 0 && <h1>Loading...</h1>}
      {posts.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
}

export default App;
