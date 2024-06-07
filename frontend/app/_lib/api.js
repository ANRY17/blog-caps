import _ from 'lodash';
const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

async function fetchData(url, options = {}) {
  try {
    const response = await fetch(`${baseUrl}${url}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all Blog Posts
export async function getAllBlogs() {
  const strapiData = await fetchData(`/api/posts?populate=cover`);
  if (!strapiData || !strapiData.data.length) return null;

  return strapiData.data.map((post) => {
    return {
      id: post.id,
      title: post.attributes.title,
      slug: post.attributes.slug,
      coverUrl: getCoverUrl(post.attributes.cover),
    };
  });
}

// Get Detail Blog by slug
export async function getBlogBySlug(slug) {
  const strapiData = await fetchData(
    `/api/posts?filters[slug][$eq]=${slug}&populate=cover,comments,seo`
  );
  if (!strapiData || !strapiData.data.length) return null;

  const post = strapiData.data[0];
  return {
    id: post.id,
    title: post.attributes.title,
    content: post.attributes.content,
    cover: getCoverUrl(post.attributes.cover),
    comments: post.attributes.comments.data.map((comment) => ({
      id: comment.id,
      content: comment.attributes.Content,
      createdAt: comment.attributes.createdAt,
      author: comment.attributes.author
        ? {
            username: comment.attributes.author.username,
            email: comment.attributes.author.email,
            id: comment.attributes.author.id,
          }
        : null,
    })),
    seo: post.attributes.seo,
  };
}

// Get Comments and Ratings by slug
export async function getCommentsAndRatingsBySlug(slug) {
  const commentsResponse = await fetchData(
    `/api/comment-manager/comments/${slug}`
  );
  const ratingsResponse = await fetchData(`/api/ratings/reviews/${slug}`);

  return {
    comments: commentsResponse.comments || [],
    reviews: ratingsResponse.reviews || [],
    averageScore: ratingsResponse.averageScore || 0,
    reviewsCount: ratingsResponse.reviewsCount || 0,
  };
}

// Get CoverUrl
export function getCoverUrl(cover) {
  const coverUrl = _.get(cover, 'data[0].attributes.url');
  return coverUrl ? `${baseUrl}${coverUrl}` : null;
}

// Post Comment and Rating
export async function postCommentAndRating(blogId, content, score, token) {
  const data = {
    comment: content,
    score: score,
  };

  return await fetchData(`/api/ratings/reviews/${blogId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
