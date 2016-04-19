'use strict';

console.log("OUTSIDE initController");

angular.module("initModule")
    .controller('initController', function ($scope, dataService) {


        $scope.instagramDataLink = 'https://www.instagram.com/oauth/authorize?client_id=b23670e220f14f1c89c11f627c9f9953&redirect_uri=https://the-mixup.herokuapp.com&response_type=code';

        console.log("INSIDE initController");

        $scope.initInstagram = function () {
            dataService.tapInsta(function (response) {


                // console.info(response.data);

                $scope.instagramData = response.data.link;
                return response.data.link
            });
        };

        var windowLocation = window.location.href;

        var windowLocationWithToken = windowLocation.replace("https://the-mixup.herokuapp.com/?code=", "");

        console.log(windowLocationWithToken);

        //        dataService.callApi(function (response) {
        //
        //            console.info(response.data);
        //            $scope.todos = response.data;
        //
        //        });

    });