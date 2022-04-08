import '../styles/components/_comment.css';

const Comment = ({ comment }) => {
  return (
    <div className='comment'>
      <h3 className='comment__email'>{comment.email}</h3>
      <h4 className='comment__name'>{comment.name}</h4>
      <p className='comment__body'>{comment.body}</p>
    </div>
  )
}

export default Comment;
