import api from './api';

const pagination = (totalPosts, pageLimit) => {
  const totalPages = Math.floor(totalPosts / pageLimit);
  const lastPageLimit = totalPosts % pageLimit;

  return [...new Array(totalPages).fill(pageLimit), lastPageLimit];
};

const getCurrentPagePosts = (index, defaultPageLimit, currentPageLimit) => () => {
  return api.get('posts', {
    params: {
      _start: index * defaultPageLimit,
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

const getAllPosts = (totalPosts, pageLimit) => {
  return pagination(totalPosts, pageLimit).reduce((currentPosts, currentPageLimit, index) => {
    const newPostsList = getCurrentPagePosts(index, pageLimit, currentPageLimit);

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
    });
}

export default getAllPosts;
