const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types // 适用于数据类型变化比较频繁的场景，可以存储任何类型的数据

// 描述整个模型需要的字段以及类型
const movieSchema = new Schema({
    doubanId: {
        unique: true,
        type: String
    },

    category: [{
        type: ObjectId,
        ref: 'Category'
    }],
    rate: Number,
    title: String,
    summary: String,
    video: String,
    poster: String,
    cover: String,

    videoKey: String,
    posterKey: String,
    coverKey: String,

    rawTitle: String, // 英文标题
    movieTypes: [String],
    pubdate: Mixed,
    year: Number,

    tags: Array,

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
movieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

mongoose.model('Movie', movieSchema) // 发布模型
