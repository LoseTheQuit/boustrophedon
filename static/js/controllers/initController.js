'use strict';

console.log("OUTSIDE initController");

angular.module("initModule")
    .controller('initController', function ($scope, dataService) {

        console.log("INSIDE initController");

        $scope.initInstagram = function () {
            dataService.tapInsta(function (response) {


                // console.info(response.data);

                $scope.instagramData = response.data.link;
                return response.data.link
            });
        };

        var windowLocation = window.location.href;

        var windowLocationWithToken = windowLocation.replace("https://the-mixup.herokuapp.com/?code=", "asdasd");

        console.log(windowLocationWithToken);

        //        dataService.callApi(function (response) {
        //
        //            console.info(response.data);
        //            $scope.todos = response.data;
        //
        //        });

    });