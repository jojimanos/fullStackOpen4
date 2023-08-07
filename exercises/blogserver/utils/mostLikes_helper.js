const mostLikes = (blogs) => {

    const likes = blogs.map(blog => blog.likes)
    console.log(Math.max(...likes))

    const mostLikes = blogs.filter((blog) => {return blog.likes === Math.max(...likes)})
    console.log(mostLikes)

    return mostLikes[0]

}

module.exports = {mostLikes}