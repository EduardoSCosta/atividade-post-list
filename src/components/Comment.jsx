const Comment = ({ comment }) => {
  return (
    <div>
      <h3>{comment.email}</h3>
      <h4>{comment.name}</h4>
      <p>{comment.body}</p>
    </div>
  )
}

export default Comment;
