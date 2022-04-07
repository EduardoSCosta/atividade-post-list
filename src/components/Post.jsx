import '../styles/components/_post.css';
import Comment from './Comment';

const Post = ({ post }) => {
  return (
    <div className='post'>
      <h3 className='post__title'>{post.title}</h3>
      <p className='post__body'>{post.body}</p>
      <details>
        <summary>Comments</summary>
        {post.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </details>
    </div>
  )
}

export default Post;
