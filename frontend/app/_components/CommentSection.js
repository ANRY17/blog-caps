'use client';
import React, { useState, useEffect } from 'react';
import {
  postCommentAndRating,
  getCommentsAndRatingsBySlug,
} from '@/app/_lib/api';

const CommentSection = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(null);
  const [score, setScore] = useState('');
  const [existingReview, setExistingReview] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    const fetchCommentsAndRatings = async () => {
      const data = await getCommentsAndRatingsBySlug(blogId);
      setComments(data.reviews);
      setRating(data.averageScore);
      // Check if user already submitted a review
      const user = JSON.parse(localStorage.getItem('user'));
      const userReview = data.reviews.find(
        (review) => review.author && review.author.username === user.username
      );
      setExistingReview(userReview);
      // Disable input if user already submitted a review
      setInputDisabled(!!userReview);
    };
    fetchCommentsAndRatings();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to comment and rate.');
      return;
    }

    // Check if user already submitted a review
    if (existingReview) {
      setError('You have already submitted a review for this content.');
      return;
    }

    const response = await postCommentAndRating(
      blogId,
      comment,
      parseInt(score, 10),
      token
    );
    if (response && response.id) {
      const user = JSON.parse(localStorage.getItem('user'));
      const newComment = {
        id: response.id,
        comment: comment,
        createdAt: new Date().toISOString(),
        author: user,
        score: parseInt(score, 10),
      };
      setComments([...comments, newComment]);
      setComment('');
      setScore('');
      setError('');
      setExistingReview(newComment);
      // Disable input after submitting a review
      setInputDisabled(true);
    } else {
      setError('Failed to post comment and rating.');
    }
  };

  return (
    <div>
      <h2>Comments and Ratings</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          disabled={inputDisabled}
        />
        <div>
          <label>Rating:</label>
          <select
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            disabled={inputDisabled}
          >
            <option value="" disabled>
              Select rating
            </option>
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={inputDisabled}>
          Submit Comment and Rating
        </button>
      </form>
      {error && <p>{error}</p>}
      <h3>Average Rating: {rating !== null ? rating : 'No ratings yet'}</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.author.username || 'Anonymous'}:</strong>{' '}
            {comment.comment}{' '}
            <em>{new Date(comment.createdAt).toLocaleString()}</em> - Rating:{' '}
            {comment.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
