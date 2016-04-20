'use strict';

console.log("OUTSIDE initController");

angular.module("initModule")
    .controller('initController', function ($scope, dataService) {

        console.log("INSIDE initController");



        $scope.instagramDataLink = 'https://www.instagram.com/oauth/authorize?client_id=b23670e220f14f1c89c11f627c9f9953&redirect_uri=https://the-mixup.herokuapp.com&response_type=code';

        $scope.windowInfoWithToken = dataService.getWindowInfo();

        $scope.tapIgApiCUSTOM = function () {

            dataService.tapInsta($scope.windowInfoWithToken, function (response) {

                console.warn(response.data);

                // $scope.instagramData = response.data.link;

            });

        };

        $scope.getHandleAuth = function () {
            dataService.getHandleAuth(function (response) {

                // console.info(response.data);

            });
        };

        dataService.tapInsta($scope.windowInfoWithToken, function (response) {

            $scope.instagramData = response.data;
            console.info(response.data);
        });


    });