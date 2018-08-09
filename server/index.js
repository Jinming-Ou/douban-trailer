const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas} = require('./database/init')

;(async () => {
    await connect() 

    initSchemas()
    // require('./tasks/movie')
    require('./tasks/api')
})()

const app = new Koa()

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Ethan',
        me: 'Jinming'
    })
})

app.listen(2333)