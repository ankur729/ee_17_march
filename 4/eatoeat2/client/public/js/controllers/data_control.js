app.controller('MainCtrl', ['$scope', '$http','$location','$cookieStore', function ($scope, $http,$location,$cookieStore) {

    $scope.ask_user_type_show = false;
    $scope.ask_user_type = function () {
         
          $cookieStore.put('before_login_page', $location.path());
        $scope.ask_user_type_show = !$scope.ask_user_type_show;
        
    }

    //  $scope.stylesheets = [
    //       {href: '../../css/reset.css', type:'text/css'},
    //       {href: '../../css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/reset.css', type:'text/css'},
    //       {href: '../../pages/admin/css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/media.css', type:'text/css'},
    //       {href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type:'text/css'},
          
          
    //     ];

        // $scope.scripts = [
        
        //   {href: '../../pages/admin/js/fm.parallaxator.jquery.js', type:'text/javascript'},
        //   {href: '../../pages/admin/js/global.js', type:'text/javascript'},
        //   {href: '../../pages/admin/js/min.js', type:'text/javascript'},
          
          
        // ];

$scope.test=function(){

      $location.path('/listing');
}


        
}]);


app.controller('location_controller', ['$scope', '$http','$cookieStore','$location','$timeout','$rootScope','cfpLoadingBar', function ($scope, $http,$cookieStore,$location,$timeout,$rootScope,cfpLoadingBar) {
  cfpLoadingBar.start();
    
 $('#autocomplete').change(function(){
       alert('hello');
    });

    $scope.GetAddress=function(){
       
 var tt=""  ;
     $scope.locate_val="Test Me";

if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(function (p) {
        	 LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        var mapOptions = {
            center: LatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
       GetAddress(p.coords.latitude,p.coords.longitude,LatLng);
     
    console.log(p.coords.latitude);
	console.log(p.coords.longitude);
	  
     
     
    });
} else {
    alert('Geo Location feature is not supported in this browser.');
    
}

function GetAddress(lat,lng,add) {

var geocoder = geocoder = new google.maps.Geocoder();
		   geocoder.geocode({ 'latLng': add }, function (results, status) {
               
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        
                                // results[0].address_components[1].short_name+','+
                             
                       tt=results[0].address_components[2].short_name;
					//	console.log(results[0].address_components[1].short_name+','+results[0].address_components[2].long_name);
                         $("#location").text( tt);
                         $("#autocomplete").val(results[1].formatted_address);
                        $.cookie('eatoeato.loc', results[0].address_components[2].long_name);
                         setTimeout(
                            function() 
                            {
                               window.location.href = '#/listing';
                            }, 4000);
//                        
                       console.log(tt);
                    }
                }
            });
        }


    
    }

$rootScope.loc="";
$scope.selected_location=function(loc){
//    console.log(loc);


  var h=$.cookie('eatoeato.loc');

                                     $timeout( function()
                                 { 
                                     window.location.href = '#/listing';
                                    
                                    }, 4000);
}


    }]);
app.controller('home_controller', ['$scope', '$http','$rootScope','$cookieStore','cfpLoadingBar', function ($scope, $http,$rootScope,$cookieStore,cfpLoadingBar) {
 cfpLoadingBar.start();
 $rootScope.stylesheets ="";   //load according to page rendering ..
 
 $rootScope.stylesheets = [
          {href: '../../public/css/reset.css', type:'text/css'},
           {href: '../../public/css/style.css', type:'text/css'},
           
        ];

 
//DATA FOR FOOTER LINKS

$scope.social_info_details={};
$scope.social_after_get={};
$scope.getSocialInfos=function(){

  $http({
            method: "GET",
            url: "admin/get-social-infos"
        }).then(function mySucces(response) {

            $scope.social_after_get=response.data;
            console.log(response.data);
        }, function myError(response) {

        });

}



  

}]);

//THIS CONTROLLER IS FOR RIGHT MENU --to check if user is logged in or not

app.controller('right_menu_controller', ['$scope', '$http','$cookieStore','$location', function ($scope, $http,$cookieStore,$location) {



$scope.login_button_show=false;
$scope.logout_button_show=false;
    $scope.login_logout_button_check=function(){

     
        if($cookieStore.get('s3cr3t_user')==undefined && $cookieStore.get('cook_logged_in')==undefined){
              
             $scope.login_button_show=true;
            $scope.logout_button_show=false;
        }
       
     
         if($cookieStore.get('s3cr3t_user')!=undefined)
        {
             $scope.login_button_show=false;
            $scope.logout_button_show=true;
        }
        if($cookieStore.get('cook_logged_in')!=undefined)
        {
             $scope.login_button_show=false;
            $scope.logout_button_show=true;
        }
    }

    $scope.logged_in_user_check_for_dashboard=function(){

     //console.log($cookieStore.get('s3cr3t_user'));
      if($cookieStore.get('s3cr3t_user')==undefined){
                $scope.when_location_selected=true;
        }
        else  if($cookieStore.get('s3cr3t_user')!=undefined){
           
           $scope.when_location_selected=true;
          
        }
} 


    $scope.get_details_for_logged_in_user_right_menu=function(){

        $scope.user_details={};
        $scope.user={};
        $scope.user.user_id=$cookieStore.get('s3cr3t_user')
            $http({
            method: "POST",
            url: "user/get-user-details",
            data:$scope.user
        }).then(function mySucces(response) {

            $scope.user_details=response.data;
            console.log(response.data);
        }, function myError(response) {

        });

    }

    $scope.logout=function(){

      if($cookieStore.get('s3cr3t_user')==undefined){
              $location.path('/cook_login');
            
        }else
        {
            $cookieStore.remove("s3cr3t_user");
            $location.path('/');
             $scope.login_button_show=true;
            $scope.logout_button_show=false;

        }
    };

}]);


app.controller('cook_controller', ['$scope', '$http','$rootScope','cfpLoadingBar', function ($scope, $http,$rootScope,cfpLoadingBar) {
  cfpLoadingBar.start();
    $rootScope.food_details = {};
    $scope.occassions = ['Breakfast', 'Lunch', 'Brunch', 'Dinner'];
    $scope.deliveryRange = ['within 1 km', 'Within 2km'];

$rootScope.selection_for_occasion=[];
$rootScope.selection_for_cuisines=[];
    // selected fruits  
    $scope.selection = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(val) {
        
        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {
            
            $scope.selection.splice(idx, 1);
             console.log($scope.selection);
        }

        // is newly selected
        else {
            // val.status='true';
            // $scope.selection.push(val);
            var len=$rootScope.selection_for_occasion.length;
            for(var i=0;i<len;i++){

                if($rootScope.selection_for_occasion[i].group_attr==val.group_attr && $rootScope.selection_for_occasion[i].status=='false'){

                    $rootScope.selection_for_occasion[i].status='true';
                }
               else if($rootScope.selection_for_occasion[i].group_attr==val.group_attr && $rootScope.selection_for_occasion[i].status=='true'){

                    $rootScope.selection_for_occasion[i].status='false';
                }
                else{
                   
                }
            }

            console.log($rootScope.selection_for_occasion);
             $scope.food_details.occassion_list = $rootScope.selection_for_occasion;
        }
    }

     $scope.selection2 = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection2 = function toggleSelection2(val) {
        var idx = $scope.selection2.indexOf(val);

        // is currently selected
        if (idx > -1) {
            $scope.selection2.splice(idx, 1);
        }

        // is newly selected
        else {
         
             var len=$rootScope.selection_for_cuisines.length;
            for(var i=0;i<len;i++){

                if($rootScope.selection_for_cuisines[i].category_name==val.category_name && $rootScope.selection_for_cuisines[i].status=='false'){

                    $rootScope.selection_for_cuisines[i].status='true';
                }
               else if($rootScope.selection_for_cuisines[i].category_name==val.category_name && $rootScope.selection_for_cuisines[i].status=='true'){

                    $rootScope.selection_for_cuisines[i].status='false';
                }
                else{
                   
                }
            }

            console.log($rootScope.selection_for_cuisines);
             $scope.food_details.cuisine_types = $rootScope.selection_for_cuisines;
        }
    }


    $scope.test = function () {

        $http({
            method: "GET",
            url: "foods/food-details"
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }

    $scope.save = function () {

        $http({
            method: "POST",
            url: "foods/food-details"
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }

  
}]);


app.controller('product', ['$scope', '$http', function ($scope, $http) {
    // $http.get('data/products.json').then(function (response) {
    //     $scope.products = response.data;
    // });
}]);


app.controller('user_info', ['$scope', '$http', function ($scope, $http) {

    $scope.user_details={};
    
   

    $scope.add_user_info = function (user_info) {

        
        $http({
            method: "POST",
            url: "user/add-user-info",
            data:user_info
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }

}]);

/***************************COOK CONTROLLER********************************************* */

app.controller('cook_register', ['$scope', '$http','$location','$cookieStore','$timeout','$base64','$window','$rootScope','cfpLoadingBar', function ($scope, $http,$location,$cookieStore,$timeout,$base64,$window,$rootScope,cfpLoadingBar) {
 
cfpLoadingBar.start();

    $scope.cook_login_check_for_cookie =function(){

        
        if($cookieStore.get('cook_logged_in')==undefined){
              $location.path('/cook_login');
            
        }else if($cookieStore.get('cook_logged_in')!=undefined)
        {
          

        }
    }

    $scope.check_if_cook_basic_entered_complete_pending=function(){
      
         if($cookieStore.get('basic_entered_complete_pending')==undefined){

           $location.path('/cook_create');  
        }else
        {
            console.log('cookie found');
        $location.path('/cook_basic_info');
        }
    }
          


    $scope.logout=function(){

      if($cookieStore.get('cook_logged_in')==undefined){
              $location.path('/cook_login');
            
        }else
        {
            $cookieStore.remove("cook_logged_in");
            $location.path('/');

        }
    };
$scope.cook_details={};

$scope.cook_success_detail={};

$scope.cook_complete_details={};
$scope.cook_initial_info={} //this is used when cook 1 st step registration completed

$scope.after_success_reg_message=false;

    $scope.after_success_login_message=false;
    $scope.after_failed_login_message=false;   
    $scope.already_register_check=false;

$scope.isDisabled=false; $scope.error_check1=false;
    $scope.show_company=false;
    $scope.show_basic=true;
    $scope.show_food_section=false;

    $scope.getCookRegisterData=function(){

          if($cookieStore.get('basic_entered_complete_pending')==undefined){

           $location.path('/cook_food');  
        }
        else if($cookieStore.get('cook_logged_in')!=undefined){

           $location.path('/cook_food');  
        }
        else
        {
            console.log('cookie found');
            $scope.cook_complete_details=$cookieStore.get('basic_entered_complete_pending');
        }
        
                    
     }

    $scope.form_section=function(){

        if($scope.show_basic==true && $scope.show_company==false && $scope.show_food_section==false)
        {
        $scope.show_basic=false;
        $scope.show_company=true;
        $scope.show_food_section=false;
        }
        else if($scope.show_basic==false && $scope.show_company==true && $scope.show_food_section==false)
        {
        $scope.show_basic=false;
        $scope.show_company=false;
        $scope.show_food_section=true;
        }
       
    }

    $scope.add_cook_details=function(cook_details){
       
       $scope.u=cook_details;
       $scope.cook_details="";
    
     $scope.error_check1=false;
        $scope.isDisabled=true;
    
                          $http({
                                method: "POST",
                                url: "cook/add-cook-info",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                $scope.after_success_reg_message=true;
                                
                                   $timeout( function()
                                 { 
                                     $scope.cook_complete_details=response.data;

                                     $cookieStore.put('basic_entered_complete_pending', $scope.cook_complete_details);
                                     $scope.after_success_reg_message=false;
                                     $location.path('/cook_basic_info');
                                     $scope.isDisabled=false;
                                    
                                    }, 4000);

                            console.log($scope.cook_complete_details);
                            
                            //    console.log(response.data.cook_name);

                            }, function myError(response) {
                                     $scope.cook_details="";
                                     $scope.already_register_check=true;
                                     $timeout( function()
                                 { 
                                     $scope.already_register_check=false;
                                    
                                    }, 4000);
                                
                                console.log('EMAIL ALREADY EXIST');
                            });
    
    
 

}

$scope.cook_status=false;

$scope.cook_login_check=function(cook_login){

    //  console.log(cook_login);
      $http({
            method: "POST",
            url: "cook/cook_login_check",
            data:cook_login
        }).then(function mySucces(response) {
             
             $scope.cook_login="";
             $scope.cook_success_detail=response.data[0];
             $scope.after_success_login_message=true;    
             $cookieStore.put('cook_logged_in', response.data[0]._id);
                   $timeout( function()
                      { 
                          
                                                            
                        $scope.after_success_login_message=false;
                        $location.path('/cook_food');
                        

                     }, 4000);
                     
        }, function myError(response) {
               
                   if(response.data=="cook not find"){
                       $scope.after_failed_login_message=true;
                        $timeout( function()
                        { 
                           $scope.after_failed_login_message=false;

                        }, 4000);
                   }
                   else if(response.data=="account disabled")
                   {
                      
                         $scope.cook_status=true;
                        $timeout( function()
                        { 
                           $scope.cook_status=false;

                        }, 4000);
                   }
            
        });

}
    
    $scope.cook_profile_complete = function (cook_all_details) {

       
        console.log(cook_all_details);
        $http({
            method: "POST",
            url: "cook/complete-cook-profile",
            data:cook_all_details
        }).then(function mySucces(response) {

           
              $cookieStore.remove("basic_entered_complete_pending");
              $cookieStore.put('cook_logged_in', response.data._id);
           
              $location.path('/cook_food');
           
        }, function myError(response) {

        });


    
}

$scope.cook_password_update_detail={};
    $scope.after_success_pass_update=false;
    $scope.after_failed_pass_update=false;
    
    
        $scope.cook_password_update=function(pass_update_detail){

            
                $scope.u=pass_update_detail;
                $scope.cook_password_update_detail="";
                $scope.u.cook_id=$cookieStore.get('cook_logged_in');
                console.log( $scope.u);
            
             $http({
                    method: "POST",
                    url: "cook/cook-pass-update",
                    data:pass_update_detail
                    }).then(function mySucces(response) {

                      
                            $scope.after_success_pass_update=true;
                      $timeout( function()
                      { 
                          
                            $scope.after_success_pass_update=false;                                     
                      
                     }, 3000);
                
                    }, function myError(response) {

                     
                            $scope.after_failed_pass_update=true;
                           $timeout( function()
                      { 
                          
                            $scope.after_failed_pass_update=false;                                
                   
                     }, 3000);
                });

        }

$scope.cook_acount_deactivate_details={};
$scope.after_success_account_deactivate=false;
$scope.after_failed_account_deactivate=false;

    $scope.deactivate_cook=function(cook_deactivate_detail){

          $scope.u=$scope.cook_acount_deactivate_details;
          $scope.u.cook_id=$cookieStore.get('cook_logged_in');
        //  $scope.manage_account_update_user="";
              console.log($scope.u);
            $http({
                            method: "POST",
                            url: "cook/cook-account-deactivate",
                            data: $scope.u
                            }).then(function mySucces(response) {
                                console.log(response);
                                 $scope.cook_acount_deactivate_details="";
        
                                 $scope.after_success_account_deactivate=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_account_deactivate=false;                
                                    $cookieStore.remove("cook_logged_in");
                                    $location.path('/');
                            }, 5000);
                              
                            }, function myError(response) {
                                console.log(response);
                                 $scope.after_failed_account_deactivate=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_failed_account_deactivate=false;                
                        
                            }, 3000);
                            
                            }); 
  

    }

     $scope.after_success_profile_update=false;
// $scope.cook_profile_update_data={};
// $scope.cook_profile_update_status=false;
$scope.cook_profile_update=function(cook_time_data){
         console.log(cook_time_data);
          $scope.u=cook_time_data;

          $scope.u.cook_id=$cookieStore.get('cook_logged_in');
          console.log('THIS IS CHECK');
         
          $scope.cook_profile_update_data="";
                $http({
                            method: "POST",
                            url: "cook/cook-profile-update",
                            data:$scope.u
                            }).then(function mySucces(response) {

                                   $scope.after_success_profile_update=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_profile_update=false;
                                  
                            }, 3000);
                                
                            }, function myError(response) {

                            
                            });  
    }

  $scope.cook_data_for_view={};
 
  $scope.get_cook_profile_data=function(){

         $scope.u={};
     
       $scope.u.cook_id=$cookieStore.get('cook_logged_in');
       
            $http({
                            method: "POST",
                            url: "cook/get-cook-profile-data",
                            data:$scope.u
                            }).then(function mySucces(response) {
                                $scope.cook_data_for_view=response.data[0];
                                console.log($scope.cook_data_for_view);
                            //       $scope.cook_profile_update_status=true;
                            //     $timeout( function()
                            // { 
                            //     console.log('yessssssss');
                            //        $scope.cook_profile_update_status=false;                
                                  
                            // }, 3000);
                                
                            }, function myError(response) {

                            
                            });  
    };

$scope.imageData_cook_prof="";
$scope.upload_cook_profile_image = function(files){

  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('file').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   
    $scope.imageData_cook_prof=$base64.encode(data);
    
     //console.log($scope.imageData);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);

}   

$scope.imageData_cook_banner="";
$scope.upload_cook_banner_image = function(files){
 
  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('file2').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   
    $scope.imageData_cook_banner=$base64.encode(data);
    
     //console.log($scope.imageData);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);

}  




$scope.after_success_company_details=false;

$scope.update_cook_company_details=function(){

    $scope.cook_data_for_view.cook_id=$cookieStore.get('cook_logged_in');
    $scope.cook_data_for_view.cook_profile_img=$scope.imageData_cook_prof;
    $scope.cook_data_for_view.cook_banner_img=$scope.imageData_cook_banner;
    
    console.log($scope.cook_data_for_view);

             $http({
                            method: "POST",
                            url: "cook/cook-company-details-update",
                            data:$scope.cook_data_for_view
                            }).then(function mySucces(response) {
                             
                             console.log(response);
                             $scope.get_cook_profile_data();
                                  $scope.after_success_company_details=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_company_details=false;                
                                  
                            }, 3000);
                                
                            }, function myError(response) {

                            
                            });  
}

$scope.cuisine_list={};
$scope.get_cuisines=function(){

        $http({
                            method: "GET",
                            url: "cook/get-cuisines-list",
                            
                            }).then(function mySucces(response) {
                             
                                $scope.cuisine_list=response.data;
                                $rootScope.selection_for_cuisines=$scope.cuisine_list;
                               
                                console.log(response);
                                
                            }, function myError(response) {

                            
                            });  
}

$scope.occ_list={};
$scope.veg_list={};

 $scope.get_occassion_and_veg_type=function(){

        $http({
                            method: "GET",
                            url: "cook/get-occ-veg-list",
                            
                            }).then(function mySucces(response) {
                             
                                $scope.veg_list=response.data[0].Vegetable_type;
                                $scope.occ_list=response.data[0].Occassions;
                                
                                $rootScope.selection_for_occasion=$scope.occ_list;
                                console.log($scope.veg_list);
                                
                            }, function myError(response) {

                            
                            }); 
 }

$scope.isImage = function(ext) {
          if(ext) {
            return ext == "jpg" || ext == "jpeg"|| ext == "gif" || ext=="png"
          }
        }
$scope.imageData="";
$scope.show_image_thumb=false;

$scope.cook_food_details={};

$scope.upload_food_image = function(files){

  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('file').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   $scope.show_image_thumb=true;
    $scope.imageData=$base64.encode(data);
    
  //   console.log($scope.imageData);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);

}   


$scope.upload_food_image2 = function(files){


  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('file2').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   
    $scope.imageData=$base64.encode(data);
    
  //   console.log($scope.imageData);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);


}   


$scope.after_success_food_add=false;
  $scope.save_food_details = function (save_food_details) {


       $scope.cook_id=$cookieStore.get('cook_logged_in');

       $http({
                            method: "POST",
                            url: "cook/add-food-details",
                            
                             data: {
                                    'food_details': save_food_details,
                                    'files': $scope.imageData,
                                    'cook_id': $scope.cook_id
                                }
                            }).then(function mySucces(response) {
                                  
                                //   $scope.view_food_details=
                                  console.log(response.data.food_details);
                                  $rootScope.food_details="";
                                  $scope.imageData="";
                                  $scope.show_image_thumb=false;
                               
                                  $scope.fetch_food_details();

                                          $scope.after_success_food_add=true;
                                $timeout( function()
                            { 
                                
                                    $scope.after_success_food_add=false;
                                  
                            }, 3000);
                                
                            }, function myError(response) {

                            
                            });  
    }

    $scope.view_food_details={};
    $scope.cuisine_list_details={};
    $scope.fetch_food_details=function(){
        $scope.u={};
        $scope.u.cook_id=$cookieStore.get('cook_logged_in');
        
                 $http({
                            method: "POST",
                            url: "cook/get-cook-details",
                            
                             data:$scope.u
                            }).then(function mySucces(response) {
                                  
                                   $scope.view_food_details=response.data;
                                  
                                //   $scope.view_food_details=
                                  console.log( $scope.view_food_details);
                        
                                
                            }, function myError(response) {

                            
                            });  
    }

    $scope.food_details_remove=function(food_remove_id){

        $scope.u={};
        $scope.u.food_id=food_remove_id;
        $scope.u.cook_id=$cookieStore.get('cook_logged_in');
       
         $http({
                            method: "POST",
                            url: "cook/remove-food-details",
                            data:$scope.u
                           
                         }).then(function mySucces(response) {
                                  
                               $scope.fetch_food_details();
                            
                                
                            }, function myError(response) {

                            
                            });  
        
    }

$scope.sel_for_oc_update=[];
$scope.sel_for_cu_update=[];

       $scope.food_details_fetch=function(food_edit_id){
           
        $scope.u={};
        $scope.u.food_id=food_edit_id;
        $scope.u.cook_id=$cookieStore.get('cook_logged_in');
       
         $http({
                            method: "POST",
                            url: "cook/edit-food-details",
                            data:$scope.u
                           
                         }).then(function mySucces(response) {
                                  
                             console.log(response.data);
                           
                                $scope.food_details=response.data;
                                    $scope.sel_for_oc_update=response.data.occassion_list;
                                    $scope.sel_for_cu_update=response.data.cuisine_list;
                                    $scope.update_view_food_show=true;  
                                   // console.log( $scope.sel_for_cu_update);
                            }, function myError(response) { 

                            
                            });  
        
    }


     $scope.toggleSelection_for_occ_update = function toggleSelection(val) {
        

        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {
            
            $scope.selection.splice(idx, 1);
             console.log($scope.selection);
        }

        // is newly selected
        else {
            // val.status='true';
            // $scope.selection.push(val);
            var len=$scope.sel_for_oc_update.length;
            for(var i=0;i<len;i++){

                if($scope.sel_for_oc_update[i].group_attr==val.group_attr && $scope.sel_for_oc_update[i].status=='false'){

                    $scope.sel_for_oc_update[i].status='true';
                }
               else if($scope.sel_for_oc_update[i].group_attr==val.group_attr && $scope.sel_for_oc_update[i].status=='true'){

                    $scope.sel_for_oc_update[i].status='false';
                }else{
                   
                }
            }

            console.log($scope.sel_for_oc_update);
             $scope.food_details.occassion_list = $scope.sel_for_oc_update;
        }
    }


     $scope.toggleSelection_for_cus_update = function toggleSelection(val) {

        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {
            
            $scope.selection.splice(idx, 1);
             console.log($scope.selection);
        }

        // is newly selected
        else {
            // val.status='true';
            // $scope.selection.push(val);
            var len=$scope.sel_for_cu_update.length;
            for(var i=0;i<len;i++){

                if($scope.sel_for_cu_update[i].category_name==val.category_name && $scope.sel_for_cu_update[i].status=='false'){

                    $scope.sel_for_cu_update[i].status='true';
                }
               else  if($scope.sel_for_cu_update[i].category_name==val.category_name && $scope.sel_for_cu_update[i].status=='true'){

                    $scope.sel_for_cu_update[i].status='false';
                }else{
                   
                }
            }

            console.log($scope.sel_for_cu_update);
            $scope.food_details.cuisine_list = $scope.sel_for_cu_update;
        }
    }

   $scope.selection = [];

    // toggle selection for a given fruit by name
     $scope.toggleSelection = function toggleSelection(val) {

        var len=$scope.selection.length;
       // console.log(len);
           var n={
            "group_attr":val.group_attr
        }
        var count=0;
        var i;
        for(i=0;i<len;i++){
            if($scope.selection[i].group_attr==val.group_attr){
                count =1;
               // $scope.selection.splice(i);
                break;
            }
         
        }
        if(count>0){
            $scope.selection.splice(i,1);
            //   $scope.food_details.occassion_list = $scope.selection;
        }
        else{
            $scope.selection.push(n);
            //   /$scope.food_details.occassion_list = $scope.selection;
        }
        //  
        console.log($scope.selection);
   
    }

     $scope.selection2 = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection2 = function toggleSelection2(val) {
        
            var len=$scope.selection2.length;
       // console.log(len);
           var n={
            "category_name":val.category_name
        }
        var count=0;
        var i;
        for(i=0;i<len;i++){
            if($scope.selection2[i].category_name==val.category_name){
                count =1;
               // $scope.selection.splice(i);
                break;
            }
         
        }
        if(count>0){
            $scope.selection2.splice(i,1);
             $scope.food_details.cuisine_list = $scope.selection2;
        
        }
        else{
            $scope.selection2.push(n);
             $scope.food_details.cuisine_list = $scope.selection2;
        }
      
        console.log($scope.selection2);
     
     
 
    }

    $scope.insert_checkbox_val=function(oo){

        
            $scope.selection.push(oo);
        console.log( $scope.selection);
    }
  $scope.insert_checkbox_val2=function(oo){

        
            $scope.selection2.push(oo);
        console.log( $scope.selection2);
    }



$scope.update_food_details=function(food_details){

console.log(food_details);
$scope.u={};
$scope.u.update_food_details=food_details;

$scope.u.cook_id=$cookieStore.get('cook_logged_in');
$scope.u.food_id=food_details._id;
$scope.u.files=$scope.imageData;
console.log($scope.u);
     $http({
                            method: "POST",
                            url: "cook/update-food-details",
                            data:$scope.u
                           
                         }).then(function mySucces(response) {
                                  
                             console.log(response);
                             $scope.food_details="";
                           $scope.fetch_food_details();
                               $scope.update_view_food_show=false;  
                              
                            }, function myError(response) { 

                            
                            });  
}
 
$scope.check_val_arr=function(v){

 var len=$scope.check_for_update.occassion_list.length;
console.log(len);

for(var i=0;i<len;i++){

    if(v==$scope.check_for_update.occassion_list[i].group_attr){

        return 'true';

    }
    else{

        return 'false';
    }

}

}


}]);


/************************************USER CONTROLLER*************************** */

app.controller('user_register', ['$scope', '$http','$location','$cookieStore','$timeout','$routeParams','$base64','$rootScope','cfpLoadingBar', function ($scope, $http,$location,$cookieStore,$timeout,$routeParams,$base64,$rootScope,cfpLoadingBar) {
cfpLoadingBar.start();
       $scope.auth=function(){

        if($cookieStore.get('s3cr3t_user')==undefined){

           $location.path('/');
        }else
        {
            console.log('cookie found');

        }
        
    }
          
    $scope.login_check_for_login=function(){

        
        if($cookieStore.get('s3cr3t_user')==undefined){
              $location.path('/user_login');
            
        }else
        {
             $location.path('/my_profile_update');
        }
    }   
    $scope.login_check_for_signup=function(){

        
        if($cookieStore.get('s3cr3t_user')==undefined){
              $location.path('/user_create');
            
        }else
        {
             $location.path('/my_profile_update');

        }
    }
    $scope.logout=function(){

      if($cookieStore.get('s3cr3t_user')==undefined){
              $location.path('/cook_login');
            
        }else
        {
            $cookieStore.remove("s3cr3t_user");
            $location.path('/');

        }
    };
    $scope.user_details={};
    $scope.user_login={};

    $scope.after_success_login_message=false;
    $scope.after_failed_login_message=false;   
    $scope.already_register_user=false;
     $scope.add_user_details=function(user_details){
         
         $scope.u=user_details;
        
    
                          $http({
                                method: "POST",
                                url: "user/add-user-info",
                                data:$scope.u
                            }).then(function mySucces(response) {

                               console.log(response);
                                $scope.user_details="";
                                 $scope.after_success_reg_message=true;
                               
                                 $timeout( function()
                                 { 
                                      $scope.after_success_reg_message=false;
                                    
                                    }, 6000);

                          

                            }, function myError(response) {

                               $scope.already_register_user=true;
                                     $timeout( function()
                                 { 
                                      $scope.already_register_user=false;
                                    
                                    }, 4000);
                               
                            });
    
}

    $scope.verify_user_params=function(){

        //    console.log('this is ID--'+$routeParams.user_id);
    
                          $http({
                                method: "GET",
                                url: "user/user-verify/"+$routeParams.user_id
                                
                            }).then(function mySucces(response) {

                              
                               $cookieStore.put('s3cr3t_user', response.data._id);
                                 $location.path('/my_profile_update');                               
                            }, function myError(response) {

                                console.log(response);
                            });
    
}


$scope.user_status=false;
$scope.after_failed_activation=false;
    $scope.user_login_check=function(user_login){
    

   
       $scope.u=user_login;
      
                      
     console.log(user_login);

            $http({
                    method: "POST",
                    url: "user/user-login",
                    data:$scope.u
                }).then(function mySucces(response) {

                    
               if(response.data=="user not found"){
                       $scope.after_failed_login_message=true;
                        $timeout( function()
                        { 
                           $scope.after_failed_login_message=false;

                        }, 4000);
                   }
                   else if(response.data=="account disabled")
                   {
             
                         $scope.user_status=true;
                        $timeout( function()
                        { 
                           $scope.user_status=false;

                        }, 4000);
                   }
                   else{
                        $scope.user_login="";
                      
                         $scope.after_success_login_message=true;    
                          $cookieStore.put('s3cr3t_user', response.data[0]._id);
                          
                           $timeout( function()
                                 { 
                                       
                                         $scope.after_success_login_message=false;
                                        //  $location.path($cookieStore.get('before_login_page'));
                                        $location.path('/');

                                    }, 4000);
                   }
                }, function myError(err) {

                    
                    $scope.after_failed_login_message=true;
                    $timeout( function()
                                 { 

                                        $scope.after_failed_login_message=false;

                                    }, 4000);
                    console.log('not found');
                }); 
               
                

    }


$scope.user_password_update_detail={};
    $scope.after_success_pass_update=false;
    $scope.after_failed_pass_update=false;
    
       $scope.user_password_update=function(pass_update_detail){

                $scope.u=pass_update_detail;
                $scope.user_password_update_detail="";
                $scope.u.user_id=$cookieStore.get('s3cr3t_user');
                console.log( $scope.u);
            
                    $http({
                            method: "POST",
                            url: "user/user-pass-update",
                            data: $scope.u
                            }).then(function mySucces(response) {

                            
                                    $scope.after_success_pass_update=true;
                            $timeout( function()
                            { 
                                
                                    $scope.after_success_pass_update=false;                                     
                            
                            }, 3000);
                        
                            }, function myError(response) {

                            
                                    $scope.after_failed_pass_update=true;
                                $timeout( function()
                            { 
                                
                                    $scope.after_failed_pass_update=false;                                
                        
                            }, 3000);
                        });
       };

$scope.user_address_detail={};
 
            $scope.update_user_address=function(address_details){
                 $scope.u=address_details;
                 $scope.user_address_detail="";
                 $scope.u.user_id=$cookieStore.get('s3cr3t_user');
              
                  $http({
                            method: "POST",
                            url: "user/user-address-add",
                            data: $scope.u
                            }).then(function mySucces(response) {

                                $scope.getUserAddress();
                                console.log('user address updating');
                            }, function myError(response) {

                            
                            });         
                       
                
            }

 $scope.user_address_list={};   // this variable is used to get/store user address

        $scope.getUserAddress=function(){

            $scope.user_id={user_id:$cookieStore.get('s3cr3t_user')};
            // console.log($scope.user_id);
             $http({
                            method: "POST",
                            url: "user/get-user-address",
                            data:$scope.user_id
                            }).then(function mySucces(response) {

                                $scope.user_address_list=response.data[0].address;
                                console.log(response.data[0].address);
                            }, function myError(response) {

                            
                            });   

        }

$scope.manage_account_update_user={};
$scope.manage_account_deactivate_user={};
$scope.after_success_account_update=false;
$scope.after_success_account_deactivate=false;
$scope.after_failed_account_deactivate=false;

      $scope.manage_account_user=function(acc_update_details){
         $scope.u=$scope.manage_account_update_user;
         $scope.u.user_id=$cookieStore.get('s3cr3t_user');
         $scope.manage_account_update_user="";
       
            $http({
                            method: "POST",
                            url: "user/user-account-update",
                            data: $scope.u
                            }).then(function mySucces(response) {
                                
                               
                             $scope.after_success_account_update=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_account_update=false;                
                        
                            }, 3000);

                            }, function myError(response) {

                                
                            }); 
    }
    
   
    
     $scope.manage_account_user_deactivate=function(acc_update_details){

       
         $scope.u=$scope.manage_account_deactivate_user;
          $scope.u.user_id=$cookieStore.get('s3cr3t_user');
        //  $scope.manage_account_update_user="";
              console.log($scope.u);
            $http({
                            method: "POST",
                            url: "user/user-account-deactivate",
                            data: acc_update_details
                            }).then(function mySucces(response) {
                                  $scope.manage_account_deactivate_user="";
        
                                 $scope.after_success_account_deactivate=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_account_deactivate=false;                
                                     $cookieStore.remove("s3cr3t_user");
                                    $location.path('/');
                            }, 3000);
                              
                            }, function myError(response) {

                                 $scope.after_failed_account_deactivate=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_failed_account_deactivate=false;                
                                  
                            }, 3000);
                            
                            }); 
    }

$scope.user_profile_update_data={};
$scope.user_profile_update_status=false;
$scope.user_profile_update=function(user_profile_details){

         if($scope.imageData=="") {
           $scope.user_profile_update_data.user_profile_image="";
           $scope.u=$scope.user_profile_update_data;
           $scope.u.user_id=$cookieStore.get('s3cr3t_user');
          console.log($scope.u);
         }
         else{
           $scope.user_profile_update_data.user_profile_image=$scope.imageData;
           $scope.u=$scope.user_profile_update_data;
           $scope.u.user_id=$cookieStore.get('s3cr3t_user');
          console.log($scope.u);
         }
           
                $http({
                            method: "POST",
                            url: "user/user-profile-update",
                            data:$scope.u
                            }).then(function mySucces(response) {

                                $scope.get_user_details();

                                  $scope.user_profile_update_status=true;
                                $timeout( function()
                            { 
                                   
                                   $scope.user_profile_update_status=false;                
                                  
                            }, 3000);
                                
                            }, function myError(response) {

                            
                            });  

}

$scope.isImage = function(ext) {
          if(ext) {
            return ext == "jpg" || ext == "jpeg"|| ext == "gif" || ext=="png"
          }
        }
$scope.imageData="";
$scope.upload_user_profile_image = function(files){

  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('file').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   
    $scope.imageData=$base64.encode(data);
    
     //console.log($scope.imageData);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);

}   



        $scope.verify_otp_textbox=false;
        $scope.user_mobile_otp="";
        $scope.verifyOTP=function(){
        $scope.verify_otp_textbox=true;

        }

        $scope.checkOTP=function(){
            console.log($scope.user_mobile_otp);
        if($scope.user_mobile_otp=="1234")
        {   
            console.log('sadfasdfdd');
        alert('OTP VERIFIED..!'); 
        }
        else if($scope.user_mobile_otp!=1234 || $scope.user_mobile_otp!=""){
            alert('WRONG OTP..!'); 
        }
        else
        {

        }

}

$scope.user_profile_image_status=false;

$scope.get_user_details=function(){
    $scope.user_id={};
    
     $scope.user_id.user_id=$cookieStore.get('s3cr3t_user');
    
          $http({
                            method: "POST",
                            url: "user/get-user-details",
                            data:$scope.user_id
                            }).then(function mySucces(response) {

                                 $scope.user_profile_update_data=response.data;
                                console.log(response.data);
                            }, function myError(response) {

                            
                            });   

}

$scope.forget_user_details={};
$scope.after_forget_mail_send=false;
$scope.after_forget_mail_failed=false;
$scope.get_user_password=function(forget_details){

    
          $http({
                            method: "POST",
                            url: "user/forget-user-password",
                            data:$scope.forget_user_details
                            }).then(function mySucces(response) {

                                
                                $scope.forget_user_details="";
                               
                                   $scope.after_forget_mail_send=true;
                                   
                                $timeout( function()
                            { 
                               
                                   $scope.after_forget_mail_send=false;                
                                  
                            }, 4000);
                                
                            }, function myError(response) {

                              
                                  $scope.after_forget_mail_failed=true;
                                   
                                $timeout( function()
                            { 
                               
                                   $scope.after_forget_mail_failed=false;                
                                  
                            }, 4000);
                            
                            });  
}

//Deleting Address of user

$scope.delete_address=function(address_id){

    $scope.delete_add={};
    $scope.delete_add.address_id=address_id;
     $scope.delete_add.user_id=$cookieStore.get('s3cr3t_user');
       $http({
                            method: "POST",
                            url: "user/delete-user-address",
                            data: $scope.delete_add
                            }).then(function mySucces(response) {

                                     $scope.getUserAddress();
                                    
                            }, function myError(response) {

                              
                            
                            });  
}


$scope.food_listing={};

$scope.loc_val_cookies=function(){
    $scope.loc_show=$.cookie('eatoeato.loc');
}

$scope.show_listing_for_user=function(){

      $location.path('/listing');
}
$scope.loc_show="";
 $scope.order = '-added';

$scope.get_foods_for_listing=function(){

     $http({
                            method: "GET",
                            url: "user/get-listing-foods"
                            
                           }).then(function mySucces(response) {

                               $scope.food_listing=response.data;
                               $scope.food_listing.total_food_count=$scope.food_listing.listing.length;
                                $scope.food_listing.filter_food_count=$scope.food_listing.listing.length;
                               $scope.loc_show=$.cookie('eatoeato.loc');
 
                                  console.log($scope.food_listing.total_food_count);
                                  console.log($scope.loc_show);
                               
                                      $scope.slider_translate.minValue=response.data.price_data.min_price;
                                      $scope.slider_translate.maxValue=response.data.price_data.max_price;
                                      $scope.slider_translate.options.ceil=response.data.price_data.max_price;
                                      $scope.slider_translate.options.floor=response.data.price_data.min_price;

                                         $scope.slider_translate_time.minTime=response.data.time_data.min_time;
                                      $scope.slider_translate_time.maxTime=response.data.time_data.max_time;
                                      $scope.slider_translate_time.options.ceil=response.data.time_data.max_time;
                                      $scope.slider_translate_time.options.floor=response.data.time_data.min_time;

                                    
                            }, function myError(response) {

                              
                            
                            });  

}
$scope.chaldo=function(){
// $scope.food_listing.listing.filter(function(x){
//     return 
// });
// console.log($scope.food_listing.listing);

for(var i=0;i<$scope.food_listing.listing.length;i++){

    for(var j=0;j<$scope.food_listing.listing[i].cuisine_list.length;j++){

          if($scope.food_listing.listing[i].cuisine_list[j].category_name !="category 1" &&  $scope.food_listing.listing[i].cuisine_list[i].category_name=="true"){
   
    }
    else{
        $scope.food_listing.listing.splice(i,1);
        i--;
      //  console.log($scope.food_listing.listing.length);
    }

    }
  

}
console.log($scope.food_listing.listing);
}

$scope.search="";  

 $scope.usePants = {};  
var vm = this;
    
   
    vm.onChangeFn = function(id, model){
    	
        console.log('this is price one');
    }
    $scope.slider_translate = {
     
        minValue: 100,
        maxValue: 400,
        options: {
            ceil: 500,
            floor: 100,
         
            translate: function (value) {

                return 'INR ' + value;
            }
        }
    };
    $scope.slider_translate_time = {
     
        minTime: 0,
        maxTime: 24,
        options: {
            ceil:24,
            floor: 0,
            
            translate: function (value) {
                if(value>=12){

                     return  value +' PM... ' ;
                }
                 if(value<12){

                     return value +' AM... ' ;
                }
            }
        }
    };
$scope.ps=[];
    $scope.price_data={};
$scope.ts=[];
    $scope.time_data={}
$scope.$on("slideEnded", function(val) {
   
    console.log(val);
        if(val.targetScope.slider.highValue<=24){
              
                $scope.time_data.min_time=val.targetScope.rzSliderModel;
                $scope.time_data.max_time=val.targetScope.rzSliderHigh;
                $scope.ts=$scope.time_data;
      //  console.log($scope.ts);
               $scope.toggleSelection_for_search( $scope.ts);
        }
        else
        {
                $scope.price_data.min_price=val.targetScope.rzSliderModel;
                $scope.price_data.max_price=val.targetScope.rzSliderHigh;
                $scope.ps=$scope.price_data;
       // console.log($scope.ps);
              $scope.toggleSelection_for_search( $scope.ps);
        }

});
  // selected checkebox for user/cooks
$scope.selection_for_search = [];
$scope.dd={};
$scope.dd.date=new Date();


    // toggle selection for a given cook/user by name
    $scope.toggleSelection_for_search = function (val) {

        console.log(val);

        if(val.group_attr){
            $scope.selection_for_search.push(val);
            var arra=[];
            for(var i=0;i<$scope.selection_for_search.length;i++){
                if( $scope.selection_for_search[i].group_attr){
                    arra.push(i);
                }
            }
            if(arra.length>1){
                $scope.selection_for_search.splice(arra[0],1);
            }
        }

           if(val.category_name){

             var idx = $scope.selection_for_search.indexOf(val);
                if (idx > -1) {
            $scope.selection_for_search.splice(idx, 1);
            
        }

      

        // is newly selected
        else {
        
             
                  $scope.selection_for_search.push(val);


            // $scope.food_details.occassion_list = $scope.selection;
        }
        
    }
      if(val.veg_type){

            $scope.selection_for_search.push(val);
            var arra=[];
            for(var i=0;i<$scope.selection_for_search.length;i++){
                if( $scope.selection_for_search[i].veg_type){
                    arra.push(i);
                }
            }
            if(arra.length>1){
                $scope.selection_for_search.splice(arra[0],1);
            }


            
        }
          if(val.date){

            $scope.selection_for_search.push(val);
            var arra=[];
            for(var i=0;i<$scope.selection_for_search.length;i++){
                if( $scope.selection_for_search[i].veg_type){
                    arra.push(i);
                }
            }
            if(arra.length>1){
                $scope.selection_for_search.splice(arra[0],1);
            }


            
        }

        if(val.min_price || val.max_price){
            
               $scope.selection_for_search.push(val);
            var arra=[];
            for(var i=0;i<$scope.selection_for_search.length;i++){
                if( $scope.selection_for_search[i].min_price){
                    arra.push(i);
                }
            }
            if(arra.length>1){
                $scope.selection_for_search.splice(arra[0],1);
            }
        }

          if(val.min_time || val.max_time){
            
               $scope.selection_for_search.push(val);
            var arra=[];
            for(var i=0;i<$scope.selection_for_search.length;i++){
                if( $scope.selection_for_search[i].min_time){
                    arra.push(i);
                }
            }
            if(arra.length>1){
                $scope.selection_for_search.splice(arra[0],1);
            }
        }
        // $scope.selection_for_search.push(val);
        // for(var i=0;i<$scope.selection_for_search.length;i++){

        //     if($scope.selection_for_search[i].hasOwnProperty('group_attr')){
        //         $scope.selection_for_search.splice(i-1, 1);
        //     }
        // }
        //  //$scope.selection_for_search.push(val);
        // console.log($scope.selection_for_search);
    //  var idx = $scope.selection_for_search.indexOf(val);

        // // is currently selected
      console.log($scope.selection_for_search);

               $http({
                            method: "POST",
                            url: "user/filter-cook-listing",
                            data:$scope.selection_for_search
                           }).then(function mySucces(response) {

                                if(response.data.length<1){
                                    $scope.get_foods_for_listing();
                                }
                                $scope.food_listing.listing=response.data;
                                $scope.food_listing.filter_food_count=response.data.length;
                                     
                                console.log(response.data);
                                        
                            }, function myError(response) {
  
                              
                            
                            }); 
       
    }

     $scope.toggleSelection_for_serach_radio = function (val) {

         var len=$scope.selection_for_search.length;
         console.log(len);
         for(var i=0;i<len;i++){

                 if($scope.selection_for_search[i].hasOwnProperty("group_attr") ){
                       $scope.selection_for_search.splice(i, 1);
                      
                       console.log($scope.selection_for_search);
                       break;
                    }
                    else{
                            $scope.selection_for_search.push(val);
                            console.log($scope.selection_for_search);
                    }
                  }
      
    //   var idx = $scope.selection_for_search.indexOf(val);

    //   if(idx>-1)          {

    //       console.log('found')
    //   }
    //   else{
         
    //          $scope.selection_for_search.push(val);
    //           console.log( $scope.selection_for_search);
    //   }
        // for(var i=0;i<$scope.selection_for_search.length;i++)      {

        //           if($scope.selection_for_search.hasOwnProperty(val.group_attr)){

        //               console.log('FOUND PROP');
        //           }
        //           else{
        //                $scope.selection_for_search.push(val);
        //        console.log($scope.selection_for_search);
        //           }
        // }
    //   var idx = $scope.selection_for_search.indexOf(val.group_attr);
        //  if($scope.selection_for_search.hasOwnProperty(val.group_attr)){

           
        //      console.log('it already have');

        //  }
        //  else{
        //       $scope.selection_for_search.push(val);
        //        console.log($scope.selection_for_search);
        //  }
   
    }
    
}]);

/*******************************ADMIN CONTROLLER*************************** */

app.controller('admin_controller', ['$scope', '$http','$rootScope','$timeout','$base64','cfpLoadingBar','Notification','$cookieStore', function ($scope, $http,$rootScope,$timeout,$base64,cfpLoadingBar,Notification,$cookieStore) {

       $rootScope.stylesheets ="";
       $rootScope.stylesheets = [
                 {href: '../../pages/admin/css/reset.css', type:'text/css'},
                 {href: '../../../pages/admin/css/style.css', type:'text/css'},
                 {href: '../../pages/admin/css/media.css', type:'text/css'},
                  {href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type:'text/css'},
        ];

$scope.user_info={};
$scope.cook_info={};
$scope.global_setting={};
$scope.social_setting={};
$scope.success_user_add=false;
$scope.success_cook_delete=false;
$scope.success_user_delete=false;
 $scope.user_list_deatils={};
 $scope.cooks_list_deatils={};

        $scope.add_user_via_admin=function(user_info){
            $scope.u={};
            $scope.u=user_info;
            $scope.user_info="";
                    $http({
                                method: "POST",
                                url: "admin/add-user-info",
                                data:$scope.u
                            }).then(function mySucces(response) {

                                console.log(response.data);
                                 $scope.user_details="";

                                $scope.success_user_add=true;
                                 $timeout( function()
                                 { 
                                      $scope.success_user_add=false;
                                    
                                    }, 4000);

                          

                            }, function myError(response) {

                            });
 

        };
        

 $scope.imageData_cook_banner_admin="";
$scope.upload_cook_banner_image_admin = function(files){
 
  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('cook_banner').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   
    $scope.imageData_cook_banner_admin=$base64.encode(data);
    
    //console.log($scope.imageData_cook_banner_admin);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);

}  

 $scope.get_admin_id=function(){

     console.log('GETTING ADMIN ID');
       $http({
                                method: "GET",
                                url: "admin/get-admin-id",
                               
                            }).then(function mySucces(response) {

                            
                               $cookieStore.put('admin_id', response.data._id);

                            }, function myError(response) {
            
                            });
 }  

 $scope.add_cook_via_admin=function(cook_info){

       Notification.warning({message: 'Please Wait..', delay: 1000});
       
            $scope.u={};
            $scope.u=cook_info;
            $scope.u.cook_banner_img=$scope.imageData_cook_banner_admin;
           

              console.log(  $scope.u);

               $http({
                                method: "POST",
                                url: "admin/add-cook-info",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                console.log(response.data);
                                $scope.cook_info="";
                               $scope.imageData_cook_banner_admin="";
                               $scope.picFile_cook_banner="";
                                Notification.success({message: 'Cook Successfully Added..', delay: 3000});
                            

                            }, function myError(response) {
            
                            });
            

        };
      
    //  $scope.stylesheets = [
         
    //       {href: '../../pages/admin/css/reset.css', type:'text/css'},
    //       {href: '../../../pages/admin/css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/media.css', type:'text/css'},
    //       {href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type:'text/css'},
          
          
    //     ];

    //     $scope.scripts = [
        
    //       {href: '../../pages/admin/js/fm.parallaxator.jquery.js', type:'text/javascript'},
    //       {href: '../../pages/admin/js/global.js', type:'text/javascript'},
    //       {href: '../../pages/admin/js/min.js', type:'text/javascript'},
          
          
    //     ];

$scope.loadUsers=function(){

           $http({
                                method: "GET",
                                url: "admin/get-all-users",
                               
                            }).then(function mySucces(response) {
                                
                                $scope.user_list_deatils=response.data;
                                 console.log($scope.user_list_deatils);
                            }, function myError(response) {

                            });

                };

$scope.loadCooks=function(){


           $http({
                                method: "GET",
                                url: "admin/get-all-cooks",
                               
                            }).then(function mySucces(response) {
                                
                                $scope.cooks_list_deatils=response.data;
                                 console.log($scope.cooks_list_deatils);
                            }, function myError(response) {

                            });

                };


    
    // selected checkebox for user/cooks
    $scope.selection = [];

    // toggle selection for a given cook/user by name
    $scope.toggleSelection = function toggleSelection(val) {
        
        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
              console.log($scope.selection);
        }

        // is newly selected
        else {
            $scope.selection.push(val);
            console.log($scope.selection);
            
            // $scope.food_details.occassion_list = $scope.selection;
        }
    }
     

    //This is used to check and Uncheck all checkbox
    $scope.checkAll = function () {
        if ($scope.hasAllCookChecked) {
          
             $scope.hasAllCookChecked = true;
        } else {
                $scope.selection=[];
             $scope.hasAllCookChecked = false;
        }
        angular.forEach($scope.cooks_list_deatils, function (item) {
            item.selected = $scope.hasAllCookChecked;
        });

    };

    $scope.tmp_cook_id;
    $scope.update_cook_details_temp=function(cook_id){

                $scope.tmp_cook_id=cook_id;
                console.log(cook_id) ;
                 $cookieStore.put('cook_update_id', $scope.tmp_cook_id);
         
            }

$scope.update_details={};
     $scope.update_cook_details_fetch=function(){

         $scope.u={};
         $scope.u.cook_id= $cookieStore.get('cook_update_id');
         
         console.log($scope.u);
              
                 $http({
                             method: "POST",
                             url: "admin/fetch-cook-by-id",
                             data:$scope.u
                            }).then(function mySucces(response) {
                                
                                $scope.update_details=response.data[0];
                                console.log( $scope.update_details);
                            }, function myError(response) {
                                console.log('err');
                             });
            }

         $scope.update_cook_details_save=function(data){
            
             if($scope.imageData_cook_banner_admin!="")
             {
               
                $scope.u=data;
                $scope.u.cook_id= $cookieStore.get('cook_update_id');
                $scope.u.cook_updated_banner_img=$scope.imageData_cook_banner_admin;
               
                 $http({
                             method: "POST",
                             url: "admin/update-cook-by-id",
                             data: $scope.u
                            }).then(function mySucces(response) {
                                  Notification.info({message: 'Cook Details Successfully Updated.!', delay: 4000});
                               console.log(response);
                            }, function myError(response) {
                                console.log('err');
                             });

             }

             else  if($scope.imageData_cook_banner_admin=="")
             {
              
                 $scope.u=data;
                $scope.u.cook_id= $cookieStore.get('cook_update_id');
              
              
                 $http({
                             method: "POST",
                             url: "admin/update-cook-by-id",
                             data: $scope.u
                            }).then(function mySucces(response) {
                                Notification.info({message: 'Cook Details Successfully Updated.!', delay: 3000});
                               console.log(response);
                            }, function myError(response) {
                                console.log('err');
                             });

             }
                
            }

    $scope.cook_delete=function(){  

                                swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plz!",
                closeOnConfirm: false,
                closeOnCancel: false
                },
                function(isConfirm){
                if (isConfirm) {

                    console.log($scope.selection);
                     if($scope.selection.length<1){
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else   {

                                                   if($scope.hasAllCookChecked)
                                    {
                                       $http({
                                                         method: "GET",
                                                         url: "admin/delete-all-cook",
                                                        
                                                        }).then(function mySucces(response) {
                                                            $scope.hasAllCookChecked.selected=false;
                                                         swal("Deleted!","All Cooks Are Deleted!", "success");


                                                        }, function myError(response) {
                                                            console.log('err');
                                                        });
                                    }
                                    else
                                    {
                                        
                                           $http({
                                                         method: "POST",
                                                         url: "admin/delete-cook",
                                                         data:$scope.selection
                                                        }).then(function mySucces(response) {
                                                        
                                                          swal("Deleted!","Cook Successfully Deleted..!", "success");
                                                          $scope.selection=[];
                                                            $scope.loadCooks();
                                                        
                                                       // Notification.error({message: 'Cook Successfully Deleted..', delay: 3000});
                                                        }, function myError(response) {
                                                            console.log('err');
                                                        });
                                    }


                     }

                                 

                  
                } else {
                    swal("Cancelled", "Your cancelled to delete cook :)", "error");
                }
                }); 
      
            // console.log($scope.selection);
           

                };

$scope.user_delete=function(){  
        
      if($scope.hasAllCookChecked)
        {
           
           $http({
                             method: "GET",
                             url: "admin/delete-all-user",
                             
                            }).then(function mySucces(response) {
                                $scope.hasAllCookChecked.selected=false;
                                $scope.success_user_delete=true;
                               $scope.loadUsers();
                                 $timeout( function()
                                 { 
                                  $scope.success_user_delete=false;
                                    
                                    }, 4000);

                            }, function myError(response) {
                                console.log('err');
                            });
         }
    else{

                $http({
                             method: "POST",
                             url: "admin/delete-user",
                             data:$scope.selection
                            }).then(function mySucces(response) {
                                //  $scope.cooks_list_deatils=response;
                              
                                $scope.success_user_delete=true;
                                $scope.loadUsers();
                               
                               $timeout( function()
                                 {
                                
                                    $scope.success_user_delete=false;
                                    
                                    }, 4000);

                            }, function myError(response) {
                                console.log('err');
                             });

         

    }

          
              
              };
    

         

             

/*******************SAVING GLOBAL SETTINGS*********** */

$scope.imageData_web_logo="";
$scope.upload_websiste_logo = function(files){
 
  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('web_logo').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   
    $scope.imageData_web_logo=$base64.encode(data);

      
   // console.log($scope.imageData_web_logo);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);

}  

$scope.imageData_footer_logo="";
$scope.upload_footer_logo = function(files){
 
  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('footer_logo').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   
    $scope.imageData_footer_logo=$base64.encode(data);
    
     //console.log($scope.imageData);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);

}  

$scope.imageData_favicon="";
$scope.upload_favicon = function(files){
 
  if(files[0] == undefined) return;
          $scope.fileExt = files[0].name.split(".").pop();
   
  var f = document.getElementById('favicon').files[0];


      r = new FileReader();
     
      r.onloadend = function(e){
    
    var data = e.target.result;
   
    $scope.imageData_favicon=$base64.encode(data);
    
    // console.log($scope.imageData_favicon);
 
    //send your binary data via $http or $resource or do anything else with it

  
      }
 
       r.readAsBinaryString(f);

}  

   $scope.save_global_setting=function(data){

        $scope.u={};
        $scope.u=data;
        $scope.u.website_logo=$scope.imageData_web_logo;
        $scope.u.footer_logo=$scope.imageData_footer_logo;
        $scope.u.favicon=$scope.imageData_favicon;
                console.log($scope.u);
                 $http({
                             method: "POST",
                             url: "admin/save-global-setting",
                             data:$scope.u
                            }).then(function mySucces(response) {
                              
                                $scope.global_setting="";
                                $scope.imageData_web_logo="";
                                $scope.imageData_footer_logo="";
                                $scope.picFile2="";
                                $scope.picFile3="";
                                $scope.picFile4="";
                                 Notification.info({message: 'Global Settings Successfully Updated.!', delay: 3000});
                                $scope.fetch_global_setting();
                            }, function myError(response) {
                                console.log('err');
                             });
            }

   $scope.fetch_global_setting=function(data){

       console.log('FETCHING');


                 $http({
                             method: "GET",
                             url: "admin/fetch-global-settings"
                            
                            }).then(function mySucces(response) {
                                
                                console.log(response.data);
                              $scope.global_setting=response.data[0];
                            }, function myError(response) {
                                console.log('err');
                             });
            }

$scope.save_information_page_details={};
$scope.after_success_info_add=false;

            $scope.save_information_page=function(ss){

                       $http({
                             method: "POST",
                             url: "admin/add-info-pages",
                             data:ss
                            }).then(function mySucces(response) {
                              
                                $scope.save_information_page_details="";
                                $scope.after_success_info_add=true;
                               
                               $timeout( function()
                                 {
                                
                                    $scope.after_success_info_add=false;
                                    
                                    }, 3000);
                            }, function myError(response) {
                                console.log('err');
                             });

            }





/******************SAVE COUPON************ */


$scope.save_coupon_details={};
$scope.after_success_coupon_add=false;
        $scope.save_coupon_page=function(coupon_details){
            $scope.u=coupon_details;
            $scope.u.categories= $scope.modernBrowsers;
            $scope.u.admin_id=$cookieStore.get('admin_id');
            console.log( $scope.u);    
         //   console.log( $scope.modernBrowsers);
              $http({
                             method: "POST",
                             url: "admin/add-coupon-info",
                             data: $scope.u
                            }).then(function mySucces(response) {
                                $scope.save_coupon_details="";
                                 for(var i=0;i<$scope.modernBrowsers.length;i++){
                                     
                                        $scope.modernBrowsers[i].ticked=false;
                                  };
                                  Notification.info({message: 'Coupon Successfully Added.', delay: 3000});
                                console.log($scope.modernBrowsers);
                            }, function myError(response) {
                                console.log('err');
                             });   
        }

$scope.cuisine_name_list=[];

          $scope.fetch_cuisine_name=function(social_details){
        
          
              $http({
                             method: "GET",
                             url: "admin/fetch-cuisine-name",
                            
                            }).then(function mySucces(response) {
                              
                              for(var i=0;i<response.data.length;i++){
                                  var send={
                                      "name":response.data[i].category_name,
                                      ticked:false
                                  };
                                  $scope.cuisine_name_list.push(send);

                            
                              }
                          
                                    console.log($scope.cuisine_name_list);

                                    
                            }, function myError(response) {
                                console.log('err');
                             });   
         }

         $scope.modernBrowsers = $scope.cuisine_name_list;
// $scope.modernBrowsers = [
//  	{name: "Opera"	},
//  	{		name: "Internet Explorer"		},
//  	{		name: "Firefox"	},
//  	{		name: "Safari"},
//  	{		name: "Chrome"	},
// ];
    $scope.jg=function(){
        console.log($scope.modernBrowsers);
    }


$scope.coupon_fetch_detail={};
    
    $scope.u={};
    $scope.u.admin_id=$cookieStore.get('admin_id');
  $scope.fetch_coupon=function(){
                        $http({
                             method: "POST",
                             url: "admin/fetch-coupon-info",
                             data:$scope.u
                            }).then(function mySucces(response) {
                                
                                $scope.coupon_fetch_detail=response.data.coupon_infos;
                                console.log($scope.coupon_fetch_detail);
                            }, function myError(response) {
                                console.log('err');
                             });   
    }		

    var count_all_coupon=false;
      $scope.checkAll_for_coupon = function () {
      
        if ($scope.hasAllCookChecked) {
          
             $scope.hasAllCookChecked = true;
             count_all_coupon=true;
        } else {
            $scope.selection=[];
             $scope.hasAllCookChecked = false;
        }
        angular.forEach($scope.coupon_fetch_detail, function (item) {
            item.selected =  $scope.hasAllCookChecked;
        });

    };

        $scope.coupon_delete=function(){  

        
                                swal({
                title: "Are you sure?",
                text: "You are going to delete Coupon Details.!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plz!",
                closeOnConfirm: false,
                closeOnCancel: false
                },
                function(isConfirm){
                if (isConfirm) {

                  
                     if($scope.selection.length<1 && count_all_coupon==false){
                        sweetAlert("Oops...", "No Checkbox Selected!", "error");
                    }
                    else   {
                        
                      
                                    
                                  if($scope.selection.length<1 && $scope.hasAllCookChecked==true)
                                     {
                                        
                                        $scope.u={};
                                        $scope.u.admin_id=$cookieStore.get('admin_id');
                                       $http({
                                                         method: "POST",
                                                         url: "admin/delete-all-coupon",
                                                        data:$scope.u
                                                        }).then(function mySucces(response) {

                                                            $scope.hasAllCookChecked=false;
                                                            $scope.hasAllCookChecked.selected=false;
                                                            swal("Deleted!","All Coupons Are Deleted!", "success");

                                                               $scope.fetch_coupon();
                                                        }, function myError(response) {
                                                            console.log('err');
                                                        });
                                    }
                if($scope.selection.length>0  && count_all_coupon==false || $scope.hasAllCookChecked==false)
                                    {
                                       
                                          $scope.u.selected_coupons=$scope.selection;
                                          $scope.u.admin_id=$cookieStore.get('admin_id');

                                           $http({
                                                         method: "POST",
                                                         url: "admin/delete-selected-coupon",
                                                         data:$scope.u
                                                        }).then(function mySucces(response) {
                                                        
                                                          swal("Deleted!","Coupon Successfully Deleted..!", "success");
                                                          $scope.selection=[];
                                                          $scope.fetch_coupon();
                                                          
                                                       // Notification.error({message: 'Cook Successfully Deleted..', delay: 3000});
                                                        }, function myError(response) {
                                                            console.log('err');
                                                        });
                                    }
                                       if($scope.selection.length>0 && count_all_coupon==true && $scope.hasAllCookChecked==true)
                                    {
                                        
                                           $scope.u={};
                                        $scope.u.admin_id=$cookieStore.get('admin_id');
                                       $http({
                                                         method: "POST",
                                                         url: "admin/delete-all-coupon",
                                                        data:$scope.u
                                                        }).then(function mySucces(response) {

                                                             $scope.hasAllCookChecked=false;
                                                            $scope.hasAllCookChecked.selected=false;
                                                            swal("Deleted!","All Coupons Are Deleted!", "success");

                                                               $scope.fetch_coupon();
                                                        }, function myError(response) {
                                                            console.log('err');
                                                        });
                                    }

                     }

                                 

                  
                } else {
                    swal("Cancelled", "Your cancelled to delete cook :)", "error");
                }
                }); 
      
            // console.log($scope.selection);
           

                };

    $scope.tmp_coupon_id;
    $scope.update_coupon_details_temp=function(coupon_id){

      
                 $scope.tmp_coupon_id=coupon_id;
                // console.log(tmp_coupon_id) ;
                 $cookieStore.put('coupon_update_id', $scope.tmp_coupon_id);
         
            }

// $scope.update_details={};
   $scope.update_coupon_details_fetch=function(coupons){

         $scope.u={};
         $scope.u.coupon_id= $cookieStore.get('coupon_update_id');
        
        console.log($scope.u);
              
                 $http({
                             method: "POST",
                             url: "admin/fetch-coupon-by-id",
                             data:$scope.u
                            }).then(function mySucces(response) {
                                
                               // $scope.update_details=response.data[0];
                                console.log( response);
                            }, function myError(response) {
                                console.log('err');
                             });
            }


     $scope.update_coupon_details=function(coupons){

         $scope.u={};
         $scope.u.coupon_id= $cookieStore.get('coupon_update_id');
        
        console.log($scope.u);
              
                //  $http({
                //              method: "POST",
                //              url: "admin/fetch-cook-by-id",
                //              data:$scope.u
                //             }).then(function mySucces(response) {
                                
                //                 $scope.update_details=response.data[0];
                //                 console.log( $scope.update_details);
                //             }, function myError(response) {
                //                 console.log('err');
                //              });
            }

			
 /******************SAVE SOCIAL INFOS************ */

$scope.save_social_details={};
$scope.after_success_social_info_add=false;
        $scope.save_social_setting=function(social_details){
        
            console.log(social_details);
              $http({
                             method: "POST",
                             url: "admin/add-social-info",
                             data:social_details
                            }).then(function mySucces(response) {
                              
                              $scope.save_social_details="";
                              
                                $scope.after_success_social_info_add=true;
                               
                               $timeout( function()
                                 {
                                
                                    $scope.after_success_social_info_add=false;
                                    
                                    }, 3000);
                            }, function myError(response) {
                                console.log('err');
                             });   
         }

    /**********Add Cateogories Info IN ADMIN ****/
      $scope.category_status_show=false;
      $scope.category_banner_show=false;
      $scope.complete_category_saved=false;

      $scope.category_details={};
    
    $scope.save_categories_infos=function(category_details_info){
        $scope.u={};
        $scope.u=category_details_info;
        $scope.u.cat_img=$scope.categoryImageData;
        $scope.u.cat_banner=$scope.categoryBannerData;
       // console.log(category_details_info);

 
         console.log($scope.u);
         $http({
                             method: "POST",
                             url: "admin/add-product-category",
                             data:$scope.u
                            }).then(function mySucces(response) {
                              
                               $scope.category_details="";
                             $scope.complete_category_saved=true;
     
                                    $timeout( function()
                                 {
                                
                                    $scope.complete_category_saved=false;
                                    
                                    }, 3000);
    
                             
                            }, function myError(response) {
                                console.log('err');
                             }); 
    }

    $scope.user_profile_image_status=false;
    
     $scope.categoryImageData="";
     $scope.categoryBannerData="";
     
$scope.upload_cateogory_image = function(){

    if( document.getElementById('category-image').files[0]==undefined)
    {
        alert('No Image Seleted')
    }
    else{
        
                             $scope.category_status_show=true;
     
                                    $timeout( function()
                                 {
                                
                                    $scope.category_status_show=false;
                                    
                                    }, 3000);
    
  var f = document.getElementById('category-image').files[0],
      r = new FileReader();
      r.onloadend = function(e){

    var data = e.target.result;
   
    $scope.categoryImageData=$base64.encode(data);
    
    console.log(' category uploaded');
                              
                              
   
  }
  r.readAsBinaryString(f);


    }

}


$scope.upload_cateogory_banner = function(){

    if( document.getElementById('category-banner').files[0]==undefined)
    {
        alert('No Image Seleted')
    }
    else{
        
          $scope.category_banner_show=true;
     
                                    $timeout( function()
                                 {
                                
                                    $scope.category_banner_show=false;
                                    
                                    }, 3000);
   
  var f = document.getElementById('category-banner').files[0],
      r = new FileReader();
      r.onloadend = function(e){

    var data = e.target.result;
   
    $scope.categoryBannerData=$base64.encode(data);
    
    console.log(' Banner uploaded');
                             
  }
  r.readAsBinaryString(f);


    }

}


$scope.att_group_details={};
$scope.add_atribute_group=function(details){

          $http({
                             method: "POST",
                             url: "admin/add-attribute-group",
                             data:$scope.att_group_details
                            }).then(function mySucces(response) {
                              
                              console.log(response);
                            //    $scope.category_details="";
                            //  $scope.complete_category_saved=true;
     
                            //         $timeout( function()
                            //      {
                                
                            //         $scope.complete_category_saved=false;
                                    
                            //         }, 3000);
    
                             
                            }, function myError(response) {
                                console.log('err');
                             }); 

}

$scope.details_for_group={};
$scope.fetch_attr_group_name=function(){

    $http({
                             method: "GET",
                             url: "admin/fetch-attr-group-name"
                            
                            }).then(function mySucces(response) {
                              
                              $scope.details_for_group=response.data[0].groupname;
                              console.log(response.data[0].groupname);
                             
                            }, function myError(response) {
                                console.log('err');
                             }); 
}


$scope.attr_fields_details={};
$scope.save_group_att_fields=function(ff){
$scope.u={};
$scope.u.f_name=ff.f_name;
$scope.u.g_name=ff.g_name.fields;

    $http({
                             method: "POST",
                             url: "admin/save-attr-field-name",
                             data:$scope.u
                            }).then(function mySucces(response) {
                              
                             console.log(response);
                             
                            }, function myError(response) {
                                console.log('err');
                             }); 
 }



}]);


//my account tabs active class add
(function () {
    angular.module('autoActive', ['ngCookies','ckeditor','720kb.datepicker','base64','ngFileUpload','rzModule','angular-loading-bar','ui-notification','angularUtils.directives.dirPagination' ,'isteven-multi-select'])
        .directive('autoActive', ['$location', function ($location) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    function setActive() {
                        var path = $location.path();
                        if (path) {
                            angular.forEach(element.find('.list'), function (li) {
                                var anchor = li.querySelector('a');
                                // if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                //     angular.element(li).addClass('active');
                                // } else {
                                //     angular.element(li).removeClass('active');
                                // }
                            });
                        }
                    }

                    setActive();

                    scope.$on('$locationChangeSuccess', setActive);
                }
            }
        }])
        
        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
  cfpLoadingBarProvider.includeBar = true;

 }])
 .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay:4000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    });

} ());
