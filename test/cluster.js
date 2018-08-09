const cluster = require('cluster')
const cpus = require('os').cpus()

let workers = [] // 存储所有的子进程

const masterProcess = () => {
    console.log(`一共有 ${cpus.length} 个核`)
    console.log(`Master 主进程 ${process.pid} 启动`)
    
    for (let i = 0; i < cpus.length; i++) {
        console.log(`正在 Fork 子进程 ${i}`)
        const worker = cluster.fork()

        workers.push(worker)

        worker.on('message', message => {
            console.log(`主进程  ${process.pid} 收到 '${JSON.stringify(message)}' 来自 ${worker.process.pid}`)
        })
    }

    workers.forEach(worker => {
        console.log(`主进程 ${process.pid} 主进程发消息给子进程 ${worker.process.pid}`)
        worker.send({ msg: `来自主进程的消息  ${process.pid}`})
    })
}

const childProcess = () => {
    console.log(`Worker 子进程 ${process.pid} 启动`)
    
    process.on('message', message => {
        console.log(`Worker 子进程 ${process.pid} 收到消息 '${JSON.stringify(message)}'`)
    })

    console.log(`Worker 子进程 ${process.pid} 发消息给主进程`)
    process.send({ msg:  `来自子进程的消息 ${process.pid}`})
}

if (cluster.isMaster) {
    masterProcess()
} else {
    childProcess()
}

/**
 * 进程：程序在某个数据集合上的一次运行，是系统资源分配和调度的独立单元
 * 线程：进程里的一个实体，是cpu调度的基本单元，是比进程更小的独立的基本单元
 * 
 * 一个线程一定属于某个进程，而且只可以属于一个进程
 * 一个进程可以拥有多个线程，同一个进程下的所有线程共享所有资源
 * 而不同进程之间往往通过消息通信来进行消息同步
 * 
 * 总结：线程是进程一部分，线程是被CPU来调度，操作系统来为进程分配资源。
 */