const Post = require('../models/post');
const { post } = require('../routes');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    
    // console.log(req);
    // Post.create({
        
    //     content: req.body.content,
    //     user: req.user.id
    // }, function(err, post){
    //     if(err){console.log('error in creating a post'); return;}

    //     return res.redirect('back');
    // });
    try {
       let post = await Post.create({
            content: req.body.content,
            user: req.user.id
        });
        // to check if it is a AJAX request

        if(req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            });
        }


        req.flash('success', 'Post published');
        // res.flash('success', 'Comments published');
        return res.redirect('back');

    } catch (err) {
        console.log('Error', err)
        return;
    }
}

// for deleting the posts and comments

module.exports.destroy = async function(req, res){
    // Post.findById(req.params.id, function(err, post){
    //     // .id means converting the object id into string
    //     if(post.user == req.user.id){
    //         post.remove();

    //         Comment.deleteMany({post: req.params.id}, function(err){
    //             return res.redirect('back');
    //         });
    //     }else{
    //         return res.redirect('back');
    //     }
    // });
    try {
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
}