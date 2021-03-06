var app = angular.module("public_view", ['ngRoute'  , 'autoActive']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            title: 'Eato Eato',
            templateUrl: 'pages/home.html',
            controller: 'MainCtrl'
        })
        
        .when('/listing', {
            title: 'listing',
            templateUrl: 'pages/listing.html',
            controller: 'MainCtrl'
        })
        
        .when('/cart', {
            title: 'Eato Eato',
            templateUrl: 'pages/cart.html',
            controller: 'MainCtrl'
        })
        
        // ------------------ user part start here ------------------

        .when('/user_login', {
            title: 'Login',
            templateUrl: 'pages/user/account/join.html',
            controller: 'MainCtrl'
        })
        
        .when('/user_create', {
            title: 'Login',
            templateUrl: 'pages/user/account/register.html',
            controller: 'MainCtrl'
        })
        
        .when('/forgot_user', {
            title: 'Login',
            templateUrl: 'pages/user/account/forgot.html',
            controller: 'MainCtrl'
        })
        
        .when('/my_reviewed', {
            title: 'Review',
            templateUrl: 'pages/user/review.html',
            controller: 'MainCtrl'
        })
        
        .when('/my_wallet', {
            title: 'wallet',
            templateUrl: 'pages/user/wallet.html',
            controller: 'MainCtrl'
        })
        
        .when('/my_password', {
            title: 'Change Password',
            templateUrl: 'pages/user/update-password.html',
            controller: 'MainCtrl'
        })

        .when('/manage_account', {
            title: 'Manage Account',
            templateUrl: 'pages/user/manage-account.html',
            controller: 'MainCtrl'
        })

        .when('/address_manage', {
            title: 'address_manage',
            templateUrl: 'pages/user/address-manage.html',
            controller: 'MainCtrl'
        })

        .when('/checkout', {
            title: 'Checkout',
            templateUrl: 'pages/user/checkout/checkout.html',
            controller: 'MainCtrl'
        })

        .when('/user_order', {
            title: 'My Orders',
            templateUrl: 'pages/user/order.html',
            controller: 'MainCtrl'
        })

        .when('/my_profile_update', {
            title: 'Profile Updates',
            templateUrl: 'pages/user/profile-update.html',
            controller: 'MainCtrl'
        })

        // ------------------ cook part start here ------------------
        
        .when('/cook_login', {
            title: 'Login as Cook',
            templateUrl: 'pages/cook/account/join.html',
            controller: 'MainCtrl'
        })
        
        .when('/cook_create', {
            title: 'Create account',
            templateUrl: 'pages/cook/account/register.html',
            controller: 'MainCtrl'
        })
        
        .when('/cook_basic_info', {
            title: 'Basic inforamtion',
            templateUrl: 'pages/cook/form/step-1.html',
            controller: 'MainCtrl'
        })
        
        .when('/cook_create_company', {
            title: 'Create company',
            templateUrl: 'pages/cook/form/step-2.html',
            controller: 'MainCtrl'
        })
        
        .when('/cook_make_food_type', {
            title: 'Create company',
            templateUrl: 'pages/cook/form/step-3.html',
            controller: 'MainCtrl'
        })
        
        .when('/deactive_cook', {
            title: 'Deactive your account',
            templateUrl: 'pages/cook/manage-account.html',
            controller: 'MainCtrl'
        })
        
        .when('/forgot_cook', {
            title: 'Login',
            templateUrl: 'pages/cook/account/forgot.html',
            controller: 'MainCtrl'
        })
        
        .when('/cook_passbook', {
            title: 'Passbook',
            templateUrl: 'pages/cook/payment.html',
            controller: 'MainCtrl'
        })

        .when('/cook_account', {
            title: 'Manage Account',
            templateUrl: 'pages/cook/manage-account.html',
            controller: 'MainCtrl'
        })
        
        .when('/cook_password_change', {
            title: 'Change Password',
            templateUrl: 'pages/cook/update-password.html',
            controller: 'MainCtrl'
        })

        .when('/cook_order', {
            title: 'Cook Orders',
            templateUrl: 'pages/cook/order.html',
            controller: 'MainCtrl'
        })

        .when('/cook_food', {
            title: 'Cook food',
            templateUrl: 'pages/cook/food.html',
            controller: 'MainCtrl',
            
        })

        .when('/cook_profile', {
            title: 'Cook Profile update',
            templateUrl: 'pages/cook/profile-update.html',
            controller: 'MainCtrl'
        })

        .when('/company_details', {
            title: 'Cook Company',
            templateUrl: 'pages/cook/company-details.html',
            controller: 'MainCtrl'
        })
        
        .when('/cook_payment', {
            title: 'wallet',
            templateUrl: 'pages/cook/wallet.html',
            controller: 'MainCtrl'
        })


         // ------------------ ADMIN part start here ------------------

          .when('/admin', {
            title: 'admin',
            templateUrl: 'pages/admin/dashboard.html',
            controller: 'MainCtrl'
        })
         
         .when('/admin/add-user', {
            title: 'add user',
            templateUrl: 'pages/admin/add-user.html',
            controller: 'MainCtrl'
        })

        .when('/admin/add-cook', {
            title: 'add user',
            templateUrl: 'pages/admin/add-cook.html',
            controller: 'MainCtrl'
        })

        .when('/admin/view-user', {
            title: 'add user',
            templateUrl: 'pages/admin/view-user.html',
            controller: 'MainCtrl'
        })
        
        .when('/admin/view-cook', {
            title: 'add user',
            templateUrl: 'pages/admin/view-cook.html',
            controller: 'MainCtrl'
        })
        
         .when('/admin/global-setting', {
            title: 'add user',
            templateUrl: 'pages/admin/global-setting.html',
            controller: 'MainCtrl'
        })
        
        .when('/admin/social-setting', {
            title: 'add user',
            templateUrl: 'pages/admin/social-media.html',
            controller: 'MainCtrl'
        })

         .when('/admin/add-information', {
            title: 'add user',
            templateUrl: 'pages/admin/add-information.html',
            controller: 'MainCtrl'
        })

         .when('/admin/add-coupon', {
            title: 'add user',
            templateUrl: 'pages/admin/add-coupon.html',
            controller: 'MainCtrl'
        })
        
        //////// COOK CENTER
          .when('/admin/view-seller', {
            title: 'add user',
            templateUrl: 'pages/admin/view-seller.html',
            controller: 'MainCtrl'
        })
         .when('/admin/add-seller', {
            title: 'add user',
            templateUrl: 'pages/admin/add-seller.html',
            controller: 'MainCtrl'
        })
        .when('/admin/edit-cook', {
            title: 'add user',
            templateUrl: 'pages/admin/edit-cook.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-marketplace-commission', {
            title: 'add user',
            templateUrl: 'pages/admin/view-marketplace-commission.html',
            controller: 'MainCtrl'
        })
          .when('/admin/add-commission', {
            title: 'add user',
            templateUrl: 'pages/admin/add-commission.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-seller-product', {
            title: 'add user',
            templateUrl: 'pages/admin/view-seller-product.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-seller-unapproved-product', {
            title: 'add user',
            templateUrl: 'pages/admin/view-seller-unapproved-product.html',
            controller: 'MainCtrl'
        })
         .when('/admin/add-attribute-fields', {
            title: 'add user',
            templateUrl: 'pages/admin/add-attribute.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-seller-orders', {
            title: 'add user',
            templateUrl: 'pages/admin/view-seller-orders.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-marketplace-income-list', {
            title: 'add user',
            templateUrl: 'pages/admin/view-marketplace-income-list.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-marketplace-transaction-list', {
            title: 'add user',
            templateUrl: 'pages/admin/view-marketplace-transaction-list.html',
            controller: 'MainCtrl'
        })
          .when('/admin/view-seller-review', {
            title: 'add user',
            templateUrl: 'pages/admin/view-seller-review.html',
            controller: 'MainCtrl'
        })
///////////////// MANAGE CATALOGUE
        .when('/admin/add-category', {
            title: 'add user',
            templateUrl: 'pages/admin/add-category.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-category', {
            title: 'add user',
            templateUrl: 'pages/admin/view-category.html',
            controller: 'MainCtrl'
        })

         .when('/admin/add-attribute-group', {
            title: 'add user',
            templateUrl: 'pages/admin/add-attribute-group.html',
            controller: 'MainCtrl'
        })
         .when('/admin/attribute-group-list', {
            title: 'add user',
            templateUrl: 'pages/admin/attribute-group-list.html',
            controller: 'MainCtrl'
        })
         .when('/admin/attribute-list', {
            title: 'add user',
            templateUrl: 'pages/admin/attribute-list.html',
            controller: 'MainCtrl'
        })
        .when('/admin/add-attribute-fields', {
            title: 'add user',
            templateUrl: 'pages/admin/add-attribute.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-product', {
            title: 'add user',
            templateUrl: 'pages/admin/view-product.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-option', {
            title: 'add user',
            templateUrl: 'pages/admin/view-option.html',
            controller: 'MainCtrl'
        })
         .when('/admin/manufacture-list', {
            title: 'add user',
            templateUrl: 'pages/admin/manufacture-list.html',
            controller: 'MainCtrl'
        })
     
         .when('/admin/view-review', {
            title: 'add user',
            templateUrl: 'pages/admin/view-review.html',
            controller: 'MainCtrl'
        })
         .when('/admin/add-review', {
            title: 'add user',
            templateUrl: 'pages/admin/add-review.html',
            controller: 'MainCtrl'
        })
            
    

        ////////// SYSTEM

         .when('/admin/view-subscriber', {
            title: 'add user',
            templateUrl: 'pages/admin/view-subscriber.html',
            controller: 'MainCtrl'
        })
         .when('/admin/view-template', {
            title: 'add user',
            templateUrl: 'pages/admin/view-template.html',
            controller: 'MainCtrl'
        })
            
         .when('/admin/view-coupon', {
            title: 'add user',
            templateUrl: 'pages/admin/view-coupon.html',
            controller: 'MainCtrl'
        })
            .when('/admin/edit-coupon', {
            title: 'add user',
            templateUrl: 'pages/admin/edit-coupon.html',
            controller: 'MainCtrl'
        }) 
         .when('/admin/information-page', {
            title: 'add user',
            templateUrl: 'pages/admin/information-page.html',
            controller: 'MainCtrl'
        })
            
         .when('/admin/view-banners', {
            title: 'add user',
            templateUrl: 'pages/admin/view-banners.html',
            controller: 'MainCtrl'
        })
         .when('/admin/layouts', {
            title: 'add user',
            templateUrl: 'pages/admin/layouts.html',
            controller: 'MainCtrl'
        })
           
 ////////// ORDERS

         .when('/admin/view-orders', {
            title: 'add user',
            templateUrl: 'pages/admin/view-orders.html',
            controller: 'MainCtrl'
        })
         .when('/admin/complete-order', {
            title: 'add user',
            templateUrl: 'pages/admin/complete-order.html',
            controller: 'MainCtrl'
        }) .when('/admin/returned-order', {
            title: 'add user',
            templateUrl: 'pages/admin/returned-order.html',
            controller: 'MainCtrl'
        }) .when('/admin/open-order', {
            title: 'add user',
            templateUrl: 'pages/admin/open-order.html',
            controller: 'MainCtrl'
        }) .when('/admin/cancelled-order', {
            title: 'add user',
            templateUrl: 'pages/admin/cancelled-order.html',
            controller: 'MainCtrl'
        })

         .when('/verify-email-page', {
            title: 'add user',
            templateUrl: 'pages/verify-email-page.html',
            controller: 'MainCtrl'
        })

        .when('/verify-user-params/:user_id', {
            title: 'add user',
            templateUrl: 'pages/verify-email-params.html',
            controller: 'MainCtrl'
        })

        .otherwise({ redirectTo: '/' });

}]);


/*page title call*/

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

