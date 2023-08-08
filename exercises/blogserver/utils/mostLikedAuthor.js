const mostLikedAuthor = (blogs) => {

    const blogAuthors = blogs.map(blog => blog.author)

    console.log(blogAuthors)

    const counter = {}

    blogAuthors.forEach(author => {
        if (counter[author]) {
            counter[author] += 1
        } else {
            counter[author] = 1
        }
    })

    const values = Object.values(counter)
    const keys = Object.keys(counter)

    const index = values.indexOf(Math.max(...values))

    console.log(counter, values, index, counter[0], keys)

    const response = {author: keys[index], blogs: values[index]}

    return response

}

console.log(mostLikedAuthor([{author: "George"}, {author: "Dimitris"}, {author: "Panos"}, {author: "Panos"}]))

module.exports = {mostLikedAuthor}