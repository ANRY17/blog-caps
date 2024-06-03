'use client';
import { useState } from 'react';
import { postComment } from '@/app/_lib/api';

const CommentSection = ({ blogId, initialComments }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(initialComments || []);
  const [error, setError] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to comment.');
      return;
    }

    const response = await postComment(blogId, comment, token);
    if (response && response.data) {
      setComments([
        ...comments,
        {
          id: response.data.id,
          content: response.data.attributes.Content,
          createdAt: response.data.attributes.createdAt,
        },
      ]);
      setComment('');
      setError('');
    } else {
      setError('Failed to post comment.');
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>Anonymous:</strong> {comment.content}{' '}
            <em>{new Date(comment.createdAt).toLocaleString()}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
