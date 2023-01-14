const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  if (!blogs[0]) {
    return null
  }
  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes>favorite.likes) {
      favorite = blog
    }
  })
  return favorite
}

const mostBlogs = (blogs) => {
  if (!blogs[0]) {
    return null
  }
  const frequency=_.groupBy(blogs, (blog) => blog.author)
  const groups = Object.values(frequency)
  const mostBlogsAuthor = _.maxBy(groups, group => group.length)
  return {
    name: mostBlogsAuthor[0].author,
    count: mostBlogsAuthor.length
  }

}

const mostLikes = (blogs) => {
  if (!blogs[0]) {
    return null
  }
  const frequency = _.groupBy(blogs, (blog) => blog.author)
  const groups = Object.values(frequency)
  const authorStats = groups.map(group => {
    return ({
      author: group[0].author,
      likes: totalLikes(group)
    })
  })
  const mostLikes = _.maxBy(authorStats, author => author.likes)
  return mostLikes

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}