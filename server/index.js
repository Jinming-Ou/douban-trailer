const Koa = require('koa')
const app = new Koa()
// const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')
// const ejs = require('ejs')
// const pug = require('pug')
const views = require('koa-views')
const { resolve } = require('path')

// app.use(async (ctx, next) => {
//     ctx.type = "text/html, charset=utf-8"
//     ctx.body = htmlTpl
// })

// app.use(async (ctx, next) => {
//     ctx.type = "text/html, charset=utf-8"
//     ctx.body = ejs.render(ejsTpl, {
//         you: 'Ethan',
//         me: 'Jinming'
//     })
// })


// app.use(async (ctx, next) => {
//     ctx.type = "text/html, charset=utf-8"
//     ctx.body = pug.render(pugTpl, {
//         you: 'Ethan',
//         me: 'Jinming'
//     })
// })

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