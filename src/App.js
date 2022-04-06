import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './components/Post';

function App() {
  const TOTAL_POSTS = 95;
  const PAGE_DEFAULT_LIMIT = 20;
  const PAGE_LINK = 'https://jsonplaceholder.typicode.com/posts';

  const [posts, setPosts] = useState([]);

  const pagination = () => {
    const totalPages = Math.floor(TOTAL_POSTS / PAGE_DEFAULT_LIMIT);
    const lastPageLimit = TOTAL_POSTS % PAGE_DEFAULT_LIMIT;

    return [...new Array(totalPages).fill(PAGE_DEFAULT_LIMIT), lastPageLimit];
  };

  const getCurrentPagePosts = ({ index, currentPageLimit }) => () => {
    return axios.get(PAGE_LINK, {
      params: {
        _start: index * PAGE_DEFAULT_LIMIT,
        _limit: currentPageLimit
      }
    })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
  }

  const getAllPosts = () => {
    return pagination().reduce((currentPosts, currentPageLimit, index) => {
      const newPostsList = getCurrentPagePosts({ index, currentPageLimit });

      return currentPosts.then((previousPosts) => newPostsList()
        .then((newPosts) => [...previousPosts, ...newPosts]));
    }, Promise.resolve([]))
    .then(setPosts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <h1 className='title'>Post List</h1>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </>
  );
}

export default App;
