const rp = require('request-promise-native')

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    return res 
}

;(async () => {

    let movies = [
        { doubanId: 30145655,
            title: '乐高DC超级英雄：亚特兰蒂斯之怒',
            rate: 6.2,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2529291650.jpg' 
        },{ doubanId: 30287738,
            title: '女主角',
            rate: 9.1,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2529478473.jpg' 
        }]

    movies.map(async movie => {
        let movieData = await fetchMovie(movie)

        try {
            movieData = JSON.parse(movieData)
            // console.log(movieData.tags)
            console.log(movieData.summary)
        } catch (err) {
            console.log(err)
        }
    })
})()

