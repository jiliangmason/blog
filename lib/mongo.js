let config = require('config-lite')(__dirname);
let Mongolass = require('mongolass');
let mongolass = new Mongolass();
mongolass.connect(config.mongodb);

let moment = require('moment');
let objectIdToTimeStamp = require('objectid-to-timestamp');

mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.create_at = moment(objectIdToTimeStamp(item._id)).format('YYYY-MM-DD HH:mm');
        });

        return results;
    },

    afterFindOne: function (result) {
        if (result) {
            result.create_at = moment(objectIdToTimeStamp(result._id)).format('YYYY-MM-DD HH:mm');
        }

        return result;
    }
});

exports.User = mongolass.model('User', {
    name: {type: 'string'},
    password: {type: 'string'},
    avator: {type: 'string'},
    gender: {type: 'string', enum: ['m', 'f', 'x']},
    bio: {type: 'string'}
});

exports.User.index({name: 1}, {unique: true}).exec();

exports.Post = mongolass.model('Post', {
    author: {type: Mongolass.Types.ObjectId},
    title: {type: 'string'},
    content: {type: 'string'},
    pv: {type: 'number'}
});
exports.Post.index({author: 1, _id: -1}).exec(); //index表示添加索引，1升序 -1降序

exports.Comment = mongolass.model('Comment', {
    author: {type: Mongolass.Types.ObjectId},
    content: {type: 'string'},
    postId: {type: Mongolass.Types.ObjectId}
});
exports.Comment.index({postId: 1, _id: 1}).exec();
exports.Comment.index({author: 1, _id: 1}).exec();
