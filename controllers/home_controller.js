const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){

    try {
         // populate the user for each post
           
    // Post.find({})
    let posts = await Post.find({})
    .sort("-createdAt")
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    let users = await User.find({});

    return res.render('home', {
        title: "Codeial | Home",
        arr: posts,
        all_users: users
    });
        
    } catch (err) {
        console.log('Error', err);
        return;
        
    }
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){

    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    
           
    // Callback used

    // .exec(function(err, posts){
    //     console.log("********", posts);
    //     console.log("********", typeof posts);
    //     // console.log("********", posts);

    //     User.find({}, function(err, users){
    //         console.log(posts);
    //     return res.render('home', {
    //         title: "Codeial | Home", 
    //         arr: posts,
    //          all_users: users
    //     });     
            
    //    });
        
    //  })
    
    
    
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').exec();


// let posts = Post.find({}).populate('comments').exec();

// posts.then()