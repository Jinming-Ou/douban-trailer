const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId // 适用于数据类型变化比较频繁的场景，可以存储任何类型的数据

// 描述整个模型需要的字段以及类型
const categorySchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    movies: [{
        type: ObjectId,
        ref: 'Movie'
    }],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        }, 
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})
// 单条数据在save之前的中间件的操作
categorySchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

mongoose.model('Category', categorySchema) // 发布模型
