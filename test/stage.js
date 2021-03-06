const { readFile } =  require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const yy = new EE()

yy.on('event', () => {
    console.log('出事啦')
})

setTimeout(() => {
    console.log('0毫秒到期执行')
}, 0)

setTimeout(() => {
    console.log('100毫秒到期执行')
}, 100)

setTimeout(() => {
    console.log('1000毫秒到期执行')
}, 1000)

readFile('../package.json', 'utf-8', data => {
    console.log('完成文件 1 读操作回调')
})

readFile('../README.md', 'utf-8', data => {
    console.log('完成文件 2 读操作的回调')
})

setImmediate(() => {
    console.log('immediate 立即回调')
})

process.nextTick(() => {
    console.log('process.nextTick 的回调')
})

Promise.resolve()
    .then(() => {
        yy.emit('event')

        process.nextTick(() => {
            console.log('process.nextTick 的第二次回调')
        })
        console.log('Promise 的第 1 次回调')
    })
    .then(() => {
        console.log('Promise 的第 2 次回调')
    })

// process.nextTick 的回调
// 出事啦
// Promise 的第 1 次回调
// Promise 的第 2 次回调
// process.nextTick 的第二次回调
// 0毫秒到期执行
// 完成文件 1 读操作回调
// 完成文件 2 读操作的回调
// immediate 立即回调
// 100毫秒到期执行
// 1000毫秒到期执行