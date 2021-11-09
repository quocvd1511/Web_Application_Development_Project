const client_login = require('../models/client_account')
const books=require('../models/books')
const {multipleMongooseToObject} = require('../util/mongoose.js')
const {mongooseToObject} = require('../util/mongoose.js')
const client_account = require('../models/client_account')
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy


class Client_Control
{
    main(req,res,next)
    {
        if(req.session.isAuth) {
            books.find({'giamgia': {$gte: 22}},
            function (err,flash_sales){
                if(!err)
                {
                    flash_sales=flash_sales.map(course => course.toObject())
                    books.find({}).limit(20).skip(20*1)
                    .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('home_client.handlebars',{layout:'client.handlebars',client_accounts: req.session.username, flash_sales: flash_sales, books: books});     
                        })
                    .catch(next)            
                } else {
                    next(err)
                }
            })   
        }else{
            books.find({'giamgia': {$gte: 22}},
            function (err,flash_sales){
                if(!err)
                {
                    flash_sales=flash_sales.map(course => course.toObject())
                    books.find({}).limit(20).skip(20*1)
                    .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('home_client.handlebars',{layout:'client.handlebars', flash_sales: flash_sales, books: books});     
                        })
                    .catch(next)            
                } else {
                    next(err)
                }
            })   
        }
    }
      
    // POST signup
    signup(req, res, next){
        const formData = req.body;
        formData.diem = 0;
        formData.tinhtrang = 'đang sử dụng';

        const Client_account = new client_account(formData);
        Client_account.save()
            .then(() => res.redirect('/'))
            .catch(error => {});
        
    }

    // Logout account
    logout(req,res,next)
    {
        req.session.destroy()
        res.redirect('/')
    }

    // Login account
    post_client(req,res,next)
    {
        client_login.findOne({$or: [{matk: req.body.username},{email: req.body.username}], matkhau: req.body.password}, 
            function (err,client_account){
                if(!err)
                {
                    if(Boolean(client_account)==false) {
                        res.redirect('/')
                    }
                    else 
                    {    
                        req.session.username=client_account.matk;
                        req.session.isAuth=true;
                        res.redirect('/')                 
                    }
                } else {
                    next(err)
                }
            })
    }

    get_client(req,res,next)
    {
        res.redirect('/')
    }

    // Tìm kiếm theo tên sách, tác giả
    search(req,res,next)
    {   
         // lấy giá trị của key name trong query parameters gửi lên
            books.find({ $or :[
                { 'tensach' : {'$regex' : req.query.name , '$options' : 'i'}},
                { 'tacgia' :  {'$regex' : req.query.name , '$options' : 'i'}}
            ]})
            .then(books => 
                {
                    books=books.map(course => course.toObject())
                    res.render('search_client.handlebars',{layout:'client.handlebars',books});
                })
            .catch(next)
    }

    // Tìm kiếm theo danh sách các thể loại
    searchTL(req,res,next)
    {   
            books.find(
                {'theloai':{'$regex' : req.params.value , '$options' : 'i'}}
            )
            .then(books => 
                {
                    books=books.map(course => course.toObject())
                    res.render('search_client.handlebars',{layout:'client.handlebars',books});
                })
            .catch(next)
    }
    
    // Tìm kiếm theo bộ lọc
    searchBL(req,res,next)
    {

        if(req.query.giaban && req.query.nxb && req.query.ngonngu){
            if(req.query.giaban === "50000") {
             books.find({$and :[
                 { giaban : {
                     $lt: 50
                 }},
                { nxb :  { $in: req.query.nxb}},
                { ngonngu :  { $in: req.query.ngonngu}}
                 ]})
              .then(books => 
             {
                 books=books.map(course => course.toObject())
                 res.render('search_client.handlebars',{layout:'client.handlebars',books});
             })
             .catch(next)
             } else if(req.query.giaban === "100000") {
                     books.find({$and :[
                          { giaban : {
                              $gte:"50",
                              $lt: "100"
                          }},
                         { nxb :  { $in: req.query.nxb}},
                         { ngonngu :  { $in: req.query.ngonngu}}
                     ]})
             .then(books => 
             {
                 books=books.map(course => course.toObject())
                 res.render('search_client.handlebars',{layout:'client.handlebars',books});
             })
                 .catch(next)
             } else if (req.query.giaban === "150000") {
                 books.find({$and :[
                  { giaban : {
                      $gte:"100",
                      $lt: "150"
                  }},
                   { nxb :  { $in: req.query.nxb}},
                   { ngonngu :  { $in: req.query.ngonngu}}
              ]})
                 .then(books => 
                  {
                         books=books.map(course => course.toObject())
                         res.render('search_client.handlebars',{layout:'client.handlebars',books});
                     })
                 .catch(next)
             } else if (req.query.giaban === "200000") {
                 books.find({$and :[
                 { giaban : {
                      $gte:"150",
                      $lt: "200"
                  }},
             { nxb :  { $in: req.query.nxb}},
             { ngonngu :  { $in: req.query.ngonngu}}
              ]})
              .then(books => 
                  {
                      books=books.map(course => course.toObject())
                      res.render('search_client.handlebars',{layout:'client.handlebars',books});
                   })
                 .catch(next)
             } else {
                 books.find({$and :[
                  { giaban : {
                        $gte: "200"
                      }},
                      { nxb :  { $in: req.query.nxb}},
                      { ngonngu :  { $in: req.query.ngonngu}}
                  ]})
                  .then(books => 
                     {
                        books=books.map(course => course.toObject())
                        res.render('search_client.handlebars',{layout:'client.handlebars',books});
                      })
                 .catch(next)
                 }
        } else if(!req.query.giaban && req.query.nxb && req.query.ngonngu){
            books.find({$and :[
                    { nxb :  { $in: req.query.nxb}},
                    { ngonngu :  { $in: req.query.ngonngu}}
                ]})
                .then(books => 
                   {
                      books=books.map(course => course.toObject())
                      res.render('search_client.handlebars',{layout:'client.handlebars',books});
                    })
               .catch(next)
            }
            else if(!req.query.giaban && !req.query.nxb && req.query.ngonngu){
                books.find(
                        { ngonngu :  { $in: req.query.ngonngu}}
                    )
                    .then(books => 
                       {
                          books=books.map(course => course.toObject())
                          res.render('search_client.handlebars',{layout:'client.handlebars',books});
                        })
                   .catch(next)
                }
                else if(!req.query.giaban && req.query.nxb && !req.query.ngonngu){
                    books.find(
                            { nxb :  { $in: req.query.nxb}}
                        )
                        .then(books => 
                           {
                              books=books.map(course => course.toObject())
                              res.render('search_client.handlebars',{layout:'client.handlebars',books});
                            })
                       .catch(next)
                    }
                    else if(req.query.giaban && req.query.nxb && !req.query.ngonngu){
                        if(req.query.giaban === "50000") {
                            books.find({$and :[
                                { giaban : {
                                    $lt: "50"
                                }},
                               { nxb :  { $in: req.query.nxb}},
                                ]})
                             .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books});
                            })
                            .catch(next)
                            } else if(req.query.giaban === "100000") {
                                    books.find({$and :[
                                         { giaban : {
                                             $gte:"50",
                                             $lt: "100"
                                         }},
                                        { nxb :  { $in: req.query.nxb}}
                                    ]})
                            .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books});
                            })
                                .catch(next)
                            } else if (req.query.giaban === "150000") {
                                books.find({$and :[
                                 { giaban : {
                                     $gte:"100",
                                     $lt: "150"
                                 }},
                                  { nxb :  { $in: req.query.nxb}}
                             ]})
                                .then(books => 
                                 {
                                        books=books.map(course => course.toObject())
                                        res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                    })
                                .catch(next)
                            } else if (req.query.giaban === "200000") {
                                books.find({$and :[
                                { giaban : {
                                     $gte:"150",
                                     $lt: "200"
                                 }},
                            { nxb :  { $in: req.query.nxb}}
                             ]})
                             .then(books => 
                                 {
                                     books=books.map(course => course.toObject())
                                     res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                  })
                                .catch(next)
                            } else {
                                books.find({$and :[
                                 { giaban : {
                                       $gte: "200"
                                     }},
                                     { nxb :  { $in: req.query.nxb}}
                                 ]})
                                 .then(books => 
                                    {
                                       books=books.map(course => course.toObject())
                                       res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                     })
                                .catch(next)
                                }
                        }
                        else if(req.query.giaban && !req.query.nxb && req.query.ngonngu){
                            if(req.query.giaban === "50000") {
                                books.find({$and :[
                                    { giaban : {
                                        $lt: "50"
                                    }},
                                   { ngonngu :  { $in: req.query.ngonngu}}
                                    ]})
                                 .then(books => 
                                {
                                    books=books.map(course => course.toObject())
                                    res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                })
                                .catch(next)
                                } else if(req.query.giaban === "100000") {
                                        books.find({$and :[
                                             { giaban : {
                                                 $gte:"50",
                                                 $lt: "100"
                                             }},
                                            { ngonngu :  { $in: req.query.ngonngu}}
                                        ]})
                                .then(books => 
                                {
                                    books=books.map(course => course.toObject())
                                    res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                })
                                    .catch(next)
                                } else if (req.query.giaban === "150000") {
                                    books.find({$and :[
                                     { giaban : {
                                         $gte:"100",
                                         $lt: "150"
                                     }},
                                      { ngonngu :  { $in: req.query.ngonngu}}
                                 ]})
                                    .then(books => 
                                     {
                                            books=books.map(course => course.toObject())
                                            res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                        })
                                    .catch(next)
                                } else if (req.query.giaban === "200000") {
                                    books.find({$and :[
                                    { giaban : {
                                         $gte:"150",
                                         $lt: "200"
                                     }},
                                { ngonngu :  { $in: req.query.ngonngu}}
                                 ]})
                                 .then(books => 
                                     {
                                         books=books.map(course => course.toObject())
                                         res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                      })
                                    .catch(next)
                                } else {
                                    books.find({$and :[
                                     { giaban : {
                                           $gte: "200"
                                         }},
                                         { ngonngu :  { $in: req.query.ngonngu}}
                                     ]})
                                     .then(books => 
                                        {
                                           books=books.map(course => course.toObject())
                                           res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                         })
                                    .catch(next)
                                    }
                        }
                        else if(req.query.giaban && !req.query.nxb && !req.query.ngonngu){
                            if(req.query.giaban === "50000") {
                                books.find({giaban : {
                                   $lt: 50
                                }}    
                            )
                               .then(books => 
                                {
                                       books=books.map(course => course.toObject())
                                       res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                   })
                               .catch(next)
                                } else if(req.query.giaban === "100000") {
                                    books.find({giaban : {
                                        $gte: 50,
                                        $lt: 100
                                    }}    
                                )
                                   .then(books => 
                                    {
                                           books=books.map(course => course.toObject())
                                           res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                       })
                                   .catch(next)
                                } else if (req.query.giaban === "150000") {
                                    books.find({giaban : {
                                         $gte:"100",
                                         $lt: "150"
                                     }}    
                                 )
                                    .then(books => 
                                     {
                                            books=books.map(course => course.toObject())
                                            res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                        })
                                    .catch(next)
                                } else if (req.query.giaban === "200000") {
                                    books.find({ giaban : {
                                         $gte:"150",
                                         $lt: "200"
                                     }
                               })
                                 .then(books => 
                                     {
                                         books=books.map(course => course.toObject())
                                         res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                      })
                                    .catch(next)
                                } else {
                                    books.find({ giaban : {
                                           $gte: "200"
                                         }
                                     })
                                     .then(books => 
                                        {
                                           books=books.map(course => course.toObject())
                                           res.render('search_client.handlebars',{layout:'client.handlebars',books});
                                         })
                                    .catch(next)
                                    }
                        }
    }

    // Khuyến mãi
    khuyenmai(req,res,next)
    {
        res.render('khuyenmai_client.handlebars',{layout: 'client.handlebars'})
    }

    // Chi tiết sách
    chitietsach(req,res,next)
    {
       
        const query = books.findOne({ 'tensach': req.params.tensach });
        query.exec(function (err, book) {
            if(!err)
                {
                    if(Boolean(book)==false) {
                        res.redirect('/')
                    }
                    else 
                    {    
                       book = mongooseToObject(book);
                       books.find({theloai: book.theloai}).limit(12).skip(12*1)
                       .then(list_book => 
                        {
                            list_book=list_book.map(course => course.toObject())
                            res.render('chitietsach_client.handlebars',{layout:'client.handlebars',books: book, list_books: list_book});
                        })
                    .catch(next)             
                    }
                } else {
                    next(err)
                }
            })
          
    }
}

module.exports = new Client_Control