const totalLikes = (blogs) => {
    
    const likesArray = blogs.map(blog => blog.likes)

    const reducer = (sum, item) => {
        return sum + item
    }

    return likesArray.reduce(reducer, 0)

}

module.exports = {totalLikes}