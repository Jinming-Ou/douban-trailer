const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-text'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production')  {
            mongoose.set('debug', true)
        }
    
        mongoose.connect(db)
    
        // 数据库断开时重新连接
        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++
            // 避免多次连接无效
            if (maxConnectTimes < 5) {
                mongoose.connect(db) 
            } else {
                throw new Error('数据库挂了吧，去看看！')
            }
        })
    
        mongoose.connection.on('error', err => {
            maxConnectTimes++
            if (maxConnectTimes < 5) {
                mongoose.connect(db) 
            } else {
                throw new Error('数据库挂了吧，去看看！')
            }
        })
    
        mongoose.connection.once('open', () => {
            const Cat = mongoose.model('Cat', { name: String })
            const catee = new Cat({ name: '小老板'})

            catee.save().then(() => {
                console.log('喵～')
            })
            resolve()
            console.log('MongoDB Connected successfully!')
        })
    })
}