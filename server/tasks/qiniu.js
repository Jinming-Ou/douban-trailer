let movies = [
    { 
        video: 'http://vt1.doubanio.com/201808081515/ef54765f4eacf953a19ee8848344f7d7/view/movie/M/402340472.mp4',
        doubanId: 30287738,
        title: '女主角',
        rate: 9.1,
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2529478473.jpg',
        cover: 'https://img3.doubanio.com/img/trailer/medium/2529483741.jpg?1533012967'
    }
]

const qiniu = require('qiniu')
const nanoid = require('nanoid') // 唯一ID生成器nanoid
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK) // 在qiniu官方SDK文档中有使用方法

const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg) // 可以从网络上获取静态资源

const uploadToQiniu = async (url, key) => {
    return new Promise((resolve, reject) => {
        client.fetch(url, bucket, key, (err, ret, info) => {
            if (err) {
                reject(err)
            } else {
                if (info.statusCode === 200) {
                    resolve({ key }) // 传出key
                } else {
                    reject({ info })
                }
            }
        })
    })
}

;(async () => {
    movies.map(async movie => {
        if (movie.video && !movie.key) {
            try {
                console.log('开始传 video')
                let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
                console.log('开始传 cover')
                let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
                console.log('开始传 poster')
                let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')

                if (videoData.key) {
                    movie.videoKey = videoData.key
                }
                if (coverData.key) {
                    movie.coverKey = coverData.key
                }
                if (posterData.key) {
                    movie.posterKey = posterData.key
                }
            } catch (err) {
                console.log(err)
            }
        }
    })
})()