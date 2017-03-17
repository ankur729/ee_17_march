
var express=require('express');

var router=express.Router();
var mongojs=require('mongojs');
var bcrypt=require('bcrypt-nodejs');
var db=mongojs('mongodb://admin:root@ds127399.mlab.com:27399/eatoeat');
var fs=require('fs');

var dns=require('dns');
var os=require('os');
var randomstring = require("randomstring");
router

.post('/add-user-info',function(req,res,next){

// res.send('Task API');

db.user_infos.save({
                    username:req.body.user_name,
                    email:req.body.user_email,
                    phone:req.body.user_contact_no,
                    password:bcrypt.hashSync(req.body.user_password,bcrypt.genSaltSync(10))
              
                    
                    },function(err,user){

                          if(err) throw err;
                            
                         res.send(user);
                        console.log('user saved');

                  })

});

router
.get('/get-admin-id',function(req,res,next){



      db.admin_infos.find( 
                            function(err, admin) {
                if( err || !admin) console.log("No  admin found");
                else 
                    {     
                           
                            if(admin.length<1){
                                

                              db.admin_infos.save({

                                    _id:mongojs.ObjectId(),
                                   
                                
                                }, function (err, data, lastErrorObject) {
                                    if(err){
                                            res.status(400);
                                            res.send('error');
                                            throw err;

                                            }    
                                            res.status(200);
                                            res.send(data);
                                           
                                });

                            }
                            else{
                                        if(admin[0].hasOwnProperty('_id')){

                                             db.admin_infos.find(
                                                        {},
                                                        
                                                        function(err, admin) {
                                                            if( err || !admin) console.log(err);
                                                            else 
                                                                {
                                                                      
                                                                      console.log(admin);
                                                                        res.status(200).send(admin[0]);
                                                                }     
                                                            });

                                   
                                
                                             }
                                            else
                                            {
                                                console.log('IT DOES NOT HAVE ID YET');
                                            }
                            }

                            
                            // res.status(200).send(admin);
                    }  
      });


});


router
.post('/add-cook-info',function(req,res,next){

// res.send('Task API');
     dns.lookup(os.hostname(), function (err, add, fam) {


var cook_bn_img=randomstring.generate(13);


var cook_banner_img=add+':3000/uploads/cook_uploads/'+cook_bn_img+'.jpg';

        

          fs.writeFile("client/uploads/cook_uploads/"+cook_bn_img+".jpg", new Buffer(req.body.cook_banner_img, "base64"), function(err) {

                                                                    if (err){

                                                                        throw err;
                                                                        console.log(err);
                                                                        res.send(err)
                                                                    }
                                                                    else{
                                                                           console.log('cook banner Img uploaded');
                                                                        // res.send("success");
                                                                        // console.log("success!");
                                                                    }

                                                                });

       db.cook_infos.save({

                   cook_name:req.body.cook_company_name,
                   cook_email:req.body.cook_email,
                   cook_contact:req.body.cook_contact,
                   cook_password:bcrypt.hashSync(req.body.cook_password,bcrypt.genSaltSync(10)),
                   status:req.body.cook_isEnable,
                   isApproved:req.body.cook_isApproved,
                   street_address:req.body.cook_street_address,
                   gender:req.body.cook_gender,
                   city:req.body.cook_city,
                   state:req.body.cook_state,
                   pincode:req.body.cook_pincode,
                   about_us:req.body.cook_about_us,
                   first_name:req.body.cook_fname,
                   last_name:req.body.cook_lname,
                   display_email:req.body.cook_display_email,
                   display_phone:req.body.cook_display_contact,
                   cook_banner_img:cook_banner_img,
                   cook_other_payment_info:req.body.cook_other_payment_info,
                   cook_commission:req.body.cook_commission
              

                  
               
            }, function (err, data, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;

                        }    
                        res.status(200);
                         res.send({'status':'Cook Successfully Added Via Admin'});
                        console.log('Cook Successfully Added Via Admin');
            });

    });

// db.cook_infos.save({
//                      cook_name:req.body.cook_name,
//                     cook_email:req.body.cook_email,
//                     c ook_contact:req.body.cook_contact_no,
//                     cook_password:bcrypt.hashSync(req.body.cook_password,bcrypt.genSaltSync(10))
              
                    
//                     },function(err,cook){

//                            if( err || !cook) console.log("err in cook");
//                            else
//                            {
                           
//                                  res.send(cook);
//                            }
//                         console.log('cook saved');

//                   })

});

router
.get('/get-all-users',function(req,res,next){

console.log('this is get');
   db.user_infos.find(function(err, users) {
  if( err || !users) console.log(err);
  else 
      {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Methods','GET');

            res.status(200).send(users);
      }     
});

});

router
.get('/get-all-cooks',function(req,res,next){

// res.send('Task API');
   db.cook_infos.find(
            {},
            { cook_name:1,cook_email:1,cook_commission:1,isApproved:1,status:1,cook_contact:1 }
            ,function(err, cooks) {
  if( err || !cooks) console.log("No  cook found");
  else 
      {     
            console.log(cooks);
            res.status(200).send(cooks);
      }     
});

});


      router
        .post('/delete-cook',function(req,res,next){


            for (var i=0; i<req.body.length; i++){
          
                  db.cook_infos.remove({"_id": db.ObjectId(req.body[i])});
            }

 
            res.status(200).send('ooook');
      });

      router
        .get('/delete-all-cook',function(req,res,next){


             db.cook_infos.remove();
              res.status(200).send('All Deleted');
              console.log('all cook deletedddd');
      });

   
   router
      .post('/delete-user',function(req,res,next){


      for (var i=0; i<req.body.length; i++){
          
            db.user_infos.remove({"_id": db.ObjectId(req.body[i])});
      }

      res.status(200).send('ooook');

      });

      
   router
        .get('/delete-all-user',function(req,res,next){


             db.user_infos.remove();
              res.status(200).send('All Deleted');
              console.log('all user deletedddd');
      });

   

// res.send('Task API');

router
.post('/save-global-setting',function(req,res,next){


// res.send('Task API');
console.log(req.body.copyright); 
var web_logo_file;
var footer_logo_file;
var favicon_file;
    dns.lookup(os.hostname(), function (err, add, fam) {


   if(req.body.hasOwnProperty('website_logo') && req.body.website_logo!="") 
   {
      var web_logo_temp=randomstring.generate(13);
       web_logo_file=add+':3000/uploads/global_setting_uploads/'+web_logo_temp+'.jpg';

        

          fs.writeFile("client/uploads/global_setting_uploads/"+web_logo_temp+".jpg", new Buffer(req.body.website_logo, "base64"), function(err) {

                                                                    if (err){

                                                                        throw err;
                                                                        console.log(err);
                                                                        res.send(err)
                                                                    }
                                                                    else{
                                                                           console.log('Website logo uploaded');
                                                                        
                                                                    }

                                                                });
                                    
                                   
      }

         if(req.body.hasOwnProperty('footer_logo') && req.body.footer_logo!="") 
   {
      var footer_logo_temp=randomstring.generate(13);
       footer_logo_file=add+':3000/uploads/global_setting_uploads/'+footer_logo_temp+'.jpg';

        

          fs.writeFile("client/uploads/global_setting_uploads/"+footer_logo_temp+".jpg", new Buffer(req.body.footer_logo, "base64"), function(err) {

                                                                    if (err){

                                                                        throw err;
                                                                        console.log(err);
                                                                        res.send(err)
                                                                    }
                                                                    else{
                                                                           console.log('Footer logo uploaded');
                                                                        
                                                                    }

                                                                });
                                    
                                   
      }
          if(req.body.hasOwnProperty('favicon') && req.body.favicon!="") 
   {
      var favicon_temp=randomstring.generate(13);
       favicon_file=add+':3000/uploads/global_setting_uploads/'+favicon_temp+'.jpg';

        

          fs.writeFile("client/uploads/global_setting_uploads/"+favicon_temp+".jpg", new Buffer(req.body.favicon, "base64"), function(err) {

                                                                    if (err){

                                                                        throw err;
                                                                        console.log(err);
                                                                        res.send(err)
                                                                    }
                                                                    else{
                                                                           console.log('Footer logo uploaded');
                                                                        
                                                                    }

                                                                });
                                    
                                   
      }


            if(req.body.favicon!="" && req.body.footer_logo!="" &&   req.body.website_logo!=""){

                        db.global_setting_infos.findAndModify(

                            {
                                query: {
                                   
                                },
                                update: {
                                   $set: {
                                          site_name:req.body.site_name,
                                          display_email:req.body.display_email,
                                          send_from_email:req.body.send_from_email,
                                          receive_on:req.body.send_from_email,
                                          phone:req.body.phone,
                                          alt_phn:req.body.alt_phn,
                                          addrress:req.body.addrress,
                                          meta_tag_title:req.body.meta_tag_title,
                                          meta_tag_desc:req.body.meta_tag_desc,
                                          meta_tag_keyword:req.body.meta_tag_keyword,
                                          google_analytic_code:req.body.google_analytic_code,
                                          google_map_code:req.body.google_map_code,
                                          schema:req.body.schema,
                                          copyright:req.body.copyright,
                                          website_logo:web_logo_file,
                                          footer_logo:footer_logo_file,
                                          favicon:favicon_file
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                             //   console.log('SUCCESS WIth Image');
                             console.log('this is temp');
                                res.status(200);
                                res.send(data);

                            });
            }
            else if(req.body.favicon=="" && req.body.footer_logo!="" &&   req.body.website_logo!=""){
                     db.global_setting_infos.findAndModify(

                            {
                                query: {
                                   
                                },
                                update: {
                                   $set: {
                                          site_name:req.body.site_name,
                                          display_email:req.body.display_email,
                                          send_from_email:req.body.send_from_email,
                                          receive_on:req.body.send_from_email,
                                          phone:req.body.phone,
                                          alt_phn:req.body.alt_phn,
                                          addrress:req.body.addrress,
                                          meta_tag_title:req.body.meta_tag_title,
                                          meta_tag_desc:req.body.meta_tag_desc,
                                          meta_tag_keyword:req.body.meta_tag_keyword,
                                          google_analytic_code:req.body.google_analytic_code,
                                          google_map_code:req.body.google_map_code,
                                          schema:req.body.schema,
                                          copyright:req.body.copyright,
                                          website_logo:web_logo_file,
                                          footer_logo:footer_logo_file,
                                         
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                             //   console.log('SUCCESS WIth Image');
                             console.log('this is temp');
                                res.status(200);
                                res.send(data);

                            });

            }
            else if(req.body.favicon=="" && req.body.footer_logo=="" &&   req.body.website_logo!=""){
                 
                    db.global_setting_infos.findAndModify(

                            {
                                query: {
                                   
                                },
                                update: {
                                   $set: {
                                          site_name:req.body.site_name,
                                          display_email:req.body.display_email,
                                          send_from_email:req.body.send_from_email,
                                          receive_on:req.body.send_from_email,
                                          phone:req.body.phone,
                                          alt_phn:req.body.alt_phn,
                                          addrress:req.body.addrress,
                                          meta_tag_title:req.body.meta_tag_title,
                                          meta_tag_desc:req.body.meta_tag_desc,
                                          meta_tag_keyword:req.body.meta_tag_keyword,
                                          google_analytic_code:req.body.google_analytic_code,
                                          google_map_code:req.body.google_map_code,
                                          schema:req.body.schema,
                                          copyright:req.body.copyright,
                                          website_logo:web_logo_file,
                                          
                                         
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                             //   console.log('SUCCESS WIth Image');
                             console.log('this is temp');
                                res.status(200);
                                res.send(data);

                            });

            }
             else if(req.body.favicon=="" && req.body.footer_logo!="" &&   req.body.website_logo==""){
                   db.global_setting_infos.findAndModify(

                            {
                                query: {
                                   
                                },
                                update: {
                                   $set: {
                                          site_name:req.body.site_name,
                                          display_email:req.body.display_email,
                                          send_from_email:req.body.send_from_email,
                                          receive_on:req.body.send_from_email,
                                          phone:req.body.phone,
                                          alt_phn:req.body.alt_phn,
                                          addrress:req.body.addrress,
                                          meta_tag_title:req.body.meta_tag_title,
                                          meta_tag_desc:req.body.meta_tag_desc,
                                          meta_tag_keyword:req.body.meta_tag_keyword,
                                          google_analytic_code:req.body.google_analytic_code,
                                          google_map_code:req.body.google_map_code,
                                          schema:req.body.schema,
                                          copyright:req.body.copyright,
                                          footer_logo:footer_logo_file,
                                          
                                         
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                             //   console.log('SUCCESS WIth Image');
                             console.log('this is temp');
                                res.status(200);
                                res.send(data);

                            });

            }
             else if(req.body.favicon!="" && req.body.footer_logo=="" &&   req.body.website_logo==""){
                     db.global_setting_infos.findAndModify(

                            {
                                query: {
                                   
                                },
                                update: {
                                   $set: {
                                          site_name:req.body.site_name,
                                          display_email:req.body.display_email,
                                          send_from_email:req.body.send_from_email,
                                          receive_on:req.body.send_from_email,
                                          phone:req.body.phone,
                                          alt_phn:req.body.alt_phn,
                                          addrress:req.body.addrress,
                                          meta_tag_title:req.body.meta_tag_title,
                                          meta_tag_desc:req.body.meta_tag_desc,
                                          meta_tag_keyword:req.body.meta_tag_keyword,
                                          google_analytic_code:req.body.google_analytic_code,
                                          google_map_code:req.body.google_map_code,
                                          schema:req.body.schema,
                                          copyright:req.body.copyright,
                                           favicon:favicon_file
                                          
                                         
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                             //   console.log('SUCCESS WIth Image');
                             console.log('this is temp');
                                res.status(200);
                                res.send(data);

                            });

            }
             else if(req.body.favicon!="" && req.body.footer_logo!="" &&   req.body.website_logo==""){
                   db.global_setting_infos.findAndModify(

                            {
                                query: {
                                   
                                },
                                update: {
                                   $set: {
                                          site_name:req.body.site_name,
                                          display_email:req.body.display_email,
                                          send_from_email:req.body.send_from_email,
                                          receive_on:req.body.send_from_email,
                                          phone:req.body.phone,
                                          alt_phn:req.body.alt_phn,
                                          addrress:req.body.addrress,
                                          meta_tag_title:req.body.meta_tag_title,
                                          meta_tag_desc:req.body.meta_tag_desc,
                                          meta_tag_keyword:req.body.meta_tag_keyword,
                                          google_analytic_code:req.body.google_analytic_code,
                                          google_map_code:req.body.google_map_code,
                                          schema:req.body.schema,
                                          copyright:req.body.copyright,
                                          footer_logo:footer_logo_file,
                                          favicon:favicon_file
                                          
                                         
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                             //   console.log('SUCCESS WIth Image');
                             console.log('this is temp');
                                res.status(200);
                                res.send(data);

                            });

            }
             else if(req.body.favicon!="" && req.body.footer_logo=="" &&   req.body.website_logo!=""){
                        db.global_setting_infos.findAndModify(

                            {
                                query: {
                                   
                                },
                                update: {
                                   $set: {
                                          site_name:req.body.site_name,
                                          display_email:req.body.display_email,
                                          send_from_email:req.body.send_from_email,
                                          receive_on:req.body.send_from_email,
                                          phone:req.body.phone,
                                          alt_phn:req.body.alt_phn,
                                          addrress:req.body.addrress,
                                          meta_tag_title:req.body.meta_tag_title,
                                          meta_tag_desc:req.body.meta_tag_desc,
                                          meta_tag_keyword:req.body.meta_tag_keyword,
                                          google_analytic_code:req.body.google_analytic_code,
                                          google_map_code:req.body.google_map_code,
                                          schema:req.body.schema,
                                          copyright:req.body.copyright,
                                          website_logo:web_logo_file,
                                          favicon:favicon_file
                                          
                                         
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                             //   console.log('SUCCESS WIth Image');
                             console.log('this is temp');
                                res.status(200);
                                res.send(data);

                            });
    
            }
            else if(req.body.favicon=="" && req.body.footer_logo=="" &&   req.body.website_logo==""){
                        db.global_setting_infos.findAndModify(

                            {
                                query: {
                                   
                                },
                                update: {
                                   $set: {
                                          site_name:req.body.site_name,
                                          display_email:req.body.display_email,
                                          send_from_email:req.body.send_from_email,
                                          receive_on:req.body.send_from_email,
                                          phone:req.body.phone,
                                          alt_phn:req.body.alt_phn,
                                          addrress:req.body.addrress,
                                          meta_tag_title:req.body.meta_tag_title,
                                          meta_tag_desc:req.body.meta_tag_desc,
                                          meta_tag_keyword:req.body.meta_tag_keyword,
                                          google_analytic_code:req.body.google_analytic_code,
                                          google_map_code:req.body.google_map_code,
                                          schema:req.body.schema,
                                          copyright:req.body.copyright,
                                         
                                          
                                         
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                             //   console.log('SUCCESS WIth Image');
                             console.log('this is temp');
                                res.status(200);
                                res.send(data);

                            });
            }
    


});




});

router

.get('/fetch-global-settings',function(req,res,next){

      console.log('testing'); 
         db.global_setting_infos.find(
                      
                        function(err, settings) {
            if( err || !settings) console.log("No  setting found");
            
            else 
                  {     
                        console.log(settings);
                        res.status(200).send(settings);
                  }     
            });
      
    });
  
router

.get('/fetch-cuisine-name',function(req,res,next){

     
         db.categories_infos.find(
                      {},
                      {category_name:1},
                        function(err, cuisine) {
            if( err || !cuisine) console.log("No  setting found");
            
            else 
                  {     
                        console.log(cuisine);
                        res.status(200).send(cuisine);
                  }     
            });
      
    });
  

router

.post('/add-info-pages',function(req,res,next){



db.information_pages.save({
                    info_title:req.body.info_title,
                    info_desc:req.body.info_desc,
                    info_meta_tag:req.body.info_meta_tag,
                    info_meta_desc:req.body.info_meta_desc,
                    info_seo_url:req.body.info_seo_url,
                    info_status:req.body.info_status,
                    info_sort_order:req.body.info_sort_order,
                
              
                    
                    },function(err,info){

                          if(err) throw err;
                            

                         res.status(200).send(info);
                        console.log('information saved');

                  })

});


router

.post('/add-coupon-info',function(req,res,next){

var coupon_data=[];
coupon_data=req.body;

coupon_data._id=mongojs.ObjectId();

     db.admin_infos.findAndModify({
                        query: { '_id': mongojs.ObjectId(req.body.admin_id)    },
                          update: {
                                          $push:{'coupon_infos': coupon_data   
                                            
                                        }
                                                  },
                                                new:true
                                            
                    }, function (err, data, lastErrorObject) {
                        if(err){
                                res.status(400);
                                res.send('error');
                                throw err;

                                }    

                                console.log(data);
                                res.status(200).send(data);
        });

// db.admin_infos.save({
//                     coupon: coupon_data
                   
//                     },function(err,coupon){

//                           if(err) throw err;
                            

//                          res.status(200).send(coupon);
//                         console.log('COUPON saved');

//                   })

});


router

.post('/fetch-coupon-info',function(req,res,next){

 db.admin_infos.find(
                { 
              
                   _id: mongojs.ObjectId(req.body.admin_id)
                           
                }
                
                ,function(err,coupon){

                        
                 if(err )
                 {  
                      res.status(404);
                      res.send('info not found');
                 }else {    

                    //    res.status(200).json(user);
                    res.send(coupon[0]);  
                    
                 }
        });

});

router
.post('/fetch-coupon-by-id',function(req,res,next){

    console.log(req.body);
    //    db.cook_infos.find(
    //                           {_id:mongojs.ObjectId(req.body.cook_id)},
    //                           { food_details:0}
    //                           ,function(err, cooks) {
    //               if( err || !cooks) console.log("No  cook found");
    //               else 
    //                     {     
    //                           console.log(cooks);
    //                           res.status(200).send(cooks);
    //                     }     
    //               });

   }); 


router

.post('/delete-selected-coupon',function(req,res,next){


    for(var i=0;i<req.body.selected_coupons.length;i++){

                  db.admin_infos.findAndModify({
                                             query:{_id:mongojs.ObjectId(req.body.admin_id)},
                                                update: {
                                                        $pull:{'coupon_infos':{'_id':mongojs.ObjectId(req.body.selected_coupons[i])}}
                                                        
                                                    }
                                            
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                    console.log('deleted');
                                                    res.status(200).send(data);
                                                   
                                        });



    }

});


router

.post('/delete-all-coupon',function(req,res,next){

    console.log('delteing ALL');
    console.log(req.body);
          db.admin_infos.findAndModify({
                                             query:{_id:mongojs.ObjectId(req.body.admin_id)},
                                                update:{'coupon_infos':[]}
                                                        
                                                   
                                            
                                        }, function (err, data, lastErrorObject) {
                                            if(err){
                                                    res.status(400);
                                                    res.send('error');
                                                     throw err;

                                                    }    
                                                    console.log('deleted');
                                                    res.status(200).send(data);
                                                   
                                        });
});



router

.post('/add-social-info',function(req,res,next){

console.log(req.body);
db.social_infos.save({
                    facebook:req.body.facebook,
                    google_plus:req.body.google_plus,
                    linked_in:req.body.linked_in,
                    instagram:req.body.instagram,
                    flickr:req.body.flickr,
                    pinterest:req.body.pinterest,
                    rss:req.body.coupon_status,
                    twitter:req.body.rss,
                    vimeo:req.body.vimeo  ,
                   
                    
                    },function(err,coupon){

                          if(err) throw err;
                            

                         res.status(200).send(coupon);
                        console.log('SOCIAL INFO saved');

                  })

});



router

.get('/get-social-infos',function(req,res,next){


//res.send('this is social infos');
 db.social_infos.find(
                { 
              
                   _id: mongojs.ObjectId('58956efa325e380c1ce8c94a')
                           
                }
                ,function(err,social_infos){

                        
                 if(err || social_infos=="")
                 {  
                      res.status(404);
                      res.send('info not found');
                 }else {    

                    //    res.status(200).json(user);
                    res.send(social_infos[0]);  
                    console.log(social_infos);
                 }
        });
});


router
.post('/add-product-category',function(req,res,next){

var date = new Date();
var current_hour = date.getTime();

var category_image='category_image'+date.getTime()+'.jpg';
var category_banner='category_banner'+date.getTime()+'.jpg';


fs.writeFile("client/uploads/admin_uploads/"+category_image+".jpg", new Buffer(req.body.cat_img, "base64"), function(err) {

    if (err){

        throw err;
    }
    else{
            
                        
           fs.writeFile("client/uploads/admin_uploads/"+category_banner+".jpg", new Buffer(req.body.cat_banner, "base64"), function(err) {

                  if (err){

                        throw err;
                  }
                  else{
                              
                            db.categories_infos.save({
                    
                    category_name:req.body.category_name,
                    meta_tag_title:req.body.meta_tag_title,
                    meta_tag_desc:req.body.meta_tag_desc,
                    cat_img:category_image,
                    cat_banner:category_banner,
                    meta_tag_keyword:req.body.meta_tag_keyword,
                    parent:req.body.parent,
                    seo_url:req.body.seo_url,
                    category_isBottom:req.body.category_isBottom,
                    category_status:req.body.category_status,
                    status:'false'
                    },function(err,category){

                           if( err || !category) console.log("err in category");
                           else
                           {
                               
                                 res.send(category);
                           }
                        console.log('category saved');

                  });


                        
                  }

                  });


    }

});

});




router
.post('/add-attribute-group',function(req,res,next){


     
           db.attribute_infos.findAndModify(
                    
                  {query:{},
                     update: { $push: { "groupname" :{'fields':req.body.attr_group_name}}  },
                     new:true
                }
                , function (err, data, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;
                         
                        }    

                        console.log(data.groupname);
                        res.send(data.groupname);
                         });
      //      db.attribute_infos.save({
                    
      //               attr_group_name:req.body.attr_group_name,
      //               attr_group_order:req.body.attr_group_order,
                   
                    
      //               },function(err,category){

      //                      if( err || !category) console.log("err in category");
      //                      else
      //                      {
      //                            console.log('Attribute group saved');
                        
      //                            res.send(category);
      //                      }
                        

      //             });


                        
      


});


router
.get('/fetch-attr-group-name',function(req,res,next){
  
   db.attribute_infos.find(function(err, attribute_infos) {
 
  if( err || !attribute_infos) console.log(err);
  else 
      {
            res.status(200).send(attribute_infos);
            console.log(attribute_infos);
      }     
});
      


});


router
.post('/save-attr-field-name',function(req,res,next){
  
  console.log(req.body);
   if(req.body.g_name=='Occassion')
           
               {
                    
                        db.attribute_infos.findAndModify(
                    
                  {query:{},
                     update: { $push: { "Occassions" :{ 'group_attr':req.body.f_name,'status':'false' }}  },
            
                     new:true
                }
                , function (err, data, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;
                         
                        }    

                        console.log(data);
                        res.send(data);
                         });


                }

                   else if(req.body.g_name=='Vegetable type')
           
               {
                  
                        db.attribute_infos.findAndModify(
                    
                  {query:{},
                     update: { $push: { "Vegetable_type" :{ 'group_attr':req.body.f_name }}  },
            
                     new:true
                }
                , function (err, data, lastErrorObject) {
                if(err){
                        res.status(400);
                        res.send('error');
                         throw err;
                         
                        }    

                        console.log(data);
                        res.send(data);
                         });


                }
        


});


router
.post('/fetch-cook-by-id',function(req,res,next){

       db.cook_infos.find(
                              {_id:mongojs.ObjectId(req.body.cook_id)},
                              { food_details:0}
                              ,function(err, cooks) {
                  if( err || !cooks) console.log("No  cook found");
                  else 
                        {     
                              console.log(cooks);
                              res.status(200).send(cooks);
                        }     
                  });

   });   

router
.post('/update-cook-by-id',function(req,res,next){

  //   console.log(req.body);
      if(req.body.hasOwnProperty('cook_updated_banner_img')){
            
              dns.lookup(os.hostname(), function (err, add, fam) {


var cook_bn_img=randomstring.generate(13);


var cook_banner_img=add+':3000/uploads/cook_uploads/'+cook_bn_img+'.jpg';

        

          fs.writeFile("client/uploads/cook_uploads/"+cook_bn_img+".jpg", new Buffer(req.body.cook_updated_banner_img, "base64"), function(err) {

                                                                    if (err){

                                                                        throw err;
                                                                        console.log(err);
                                                                        res.send(err)
                                                                    }
                                                                    else{
                                                                           console.log('cook banner Img uploaded');
                                                                        // res.send("success");
                                                                        // console.log("success!");
                                                                    }

                                                                });

                            db.cook_infos.findAndModify(

                            {
                                query: {
                                    _id: mongojs.ObjectId(req.body.cook_id)
                                },
                                update: {
                                   $set: {
                                          cook_name:req.body.cook_name,
                                          cook_email:req.body.cook_email,
                                          cook_contact:req.body.cook_contact,
                                       
                                          status:req.body.status,
                                          isApproved:req.body.isApproved,
                                          street_address:req.body.street_address,
                                          gender:req.body.gender,
                                          city:req.body.city,
                                          state:req.body.state,
                                          pincode:req.body.pincode,
                                          about_us:req.body.about_us,
                                          first_name:req.body.first_name,
                                          last_name:req.body.last_name,
                                          display_email:req.body.display_email,
                                          display_phone:req.body.display_contact,
                                          cook_banner_img:cook_banner_img,
                                          cook_other_payment_info:req.body.cook_other_payment_info,
                                          cook_commission:req.body.cook_commission
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                                console.log('SUCCESS WIth Image');
                                res.status(200);
                                res.send(data);

                            });


              });

      }
      else
      {
                   db.cook_infos.findAndModify(

                            {
                                query: {
                                    _id: mongojs.ObjectId(req.body.cook_id)
                                },
                                update: {
                                   $set: {
                                          cook_name:req.body.cook_name,
                                          cook_email:req.body.cook_email,
                                          cook_contact:req.body.cook_contact,
                                       
                                          status:req.body.status,
                                          isApproved:req.body.isApproved,
                                          street_address:req.body.street_address,
                                          gender:req.body.gender,
                                          city:req.body.city,
                                          state:req.body.state,
                                          pincode:req.body.pincode,
                                          about_us:req.body.about_us,
                                          first_name:req.body.first_name,
                                          last_name:req.body.last_name,
                                          display_email:req.body.display_email,
                                          display_phone:req.body.display_contact,
                                         
                                          cook_other_payment_info:req.body.cook_other_payment_info,
                                          cook_commission:req.body.cook_commission
                                   },      
                                     

                                },
                                new: true
                            },
                            function(err, data, lastErrorObject) {
                                if (err) {
                                    res.status(400);
                                    res.send('error');
                                    throw err;

                                }
                                console.log('SUCCESS');
                                res.status(200);
                                res.send(data);

                            });

      }
     


   });   
module.exports = router;