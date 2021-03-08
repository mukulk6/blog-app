const Blog = require('../models/blogs');

module.exports = {
    createBlogs :(req,res)=>{

        var blg= new Blog(req.body);
        var userData = req.decoded;
        console.log(blg);
        blg.createdBy = userData.userId;
        console.log(blg);
        blg.save(blg, (err,newBlog)=>{
            if(err)
            {
                res.status(500).json({sucess:false, error:err});
                
            }
            else
            {
                res.status(200).json({sucess:true, blg:newBlog})
            }

        }
        )

    },
    getBlog:(req,res)=>{
        Blog.find({},(err,blogs)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({sucess:false, error:err});
            }
            else
            {
                res.status(200).json({sucess:true, blogs:blogs});
            }

        })
    },
    
    getBlogOne:(req,res)=>{
        
        Blog.findOne({_id:req.params.blogid},(err,blogs)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({sucess:false,error:err});
            }
            else
            {
                res.status(200).json({sucess:true, blogs:blogs});
            }
        })

    },

    getAllBlogsBy:(req,res)=>{
        Blog.find({createdBy:req.params.userid},(err,blogs)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({sucess:false, error:err});
            }
            else
            {
                res.status(200).json({sucess:true, blogs:blogs});
            }
        })

    },

    
}