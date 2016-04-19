'use strict';

console.log("OUTSIDE initController");

angular.module("initModule")
    .controller('initController', function ($scope, dataService) {


        $scope.instagramDataLink = 'https://www.instagram.com/oauth/authorize?client_id=b23670e220f14f1c89c11f627c9f9953&redirect_uri=https://127.0.0.1&response_type=code';

        console.log("INSIDE initController");

        $scope.initInstagram = function () {
            dataService.tapInsta(function (response) {

                // console.info(response.data);

                $scope.instagramData = response.data.link;
                return response.data.link
            });
        };


        $scope.windowInfoWithToken = dataService.getWindowInfo();

        $scope.tapIgApiCUSTOM = function () {

            console.info($scope.windowInfoWithToken);

            dataService.tapInsta($scope.windowInfoWithToken, function (response) {

                console.warn(response.data);

                // $scope.instagramData = response.data.link;

            });

        };

        $scope.getAuthCode = function () {
            dataService.getAuthCode(function (response) {

                console.info(response.data);

            });
        };

        dataService.tapInsta($scope.windowInfoWithToken, function (response) {

            $scope.instagramData = response.data;

        });

        //        dataService.tapInsta(function (response) {
        //
        //            // console.info(response.data);
        //
        //            $scope.instagramData = response.data.link;
        //            return response.data.link
        //        });
        //
        //        dataService.callApi(function (response) {
        //
        //            console.info(response.data);
        //            $scope.todos = response.data;
        //
        //        });

    });