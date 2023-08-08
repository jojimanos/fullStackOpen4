const mostLikes = (blogs) => {

    const authorsInstances = blogs.map(blog => blog.author)

    const authors = [...new Set(authorsInstances)]

    const authorTupples = authors.map(author => { return { name: author, likes: 0 } })

    authorTupples
        .map(author => {
            return blogs
                .map( blog =>
                    {return blog.author === author.name
                        ? 
                        author.likes =
                        author.likes + blog.likes
                        :
                        author.likes
                    })
        })

    const likes = authorTupples.map(author => author.likes)

    const maxLikes = Math.max(...likes)

    const response = authorTupples.filter(author => author.likes === maxLikes)

    console.log(authors, authorTupples, likes, maxLikes, response)

    return response[0]

}

console.log(mostLikes([
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]))

module.exports = { mostLikes }