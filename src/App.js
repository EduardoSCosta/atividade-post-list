import { useEffect, useState } from 'react';
import getAllPosts from './api/dataFetch';
import Post from './components/Post';

const TOTAL_POSTS = 95;
const PAGE_DEFAULT_LIMIT = 20;

function App({ totalPosts = TOTAL_POSTS, pageLimit = PAGE_DEFAULT_LIMIT }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts(totalPosts, pageLimit).then(setPosts);
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
