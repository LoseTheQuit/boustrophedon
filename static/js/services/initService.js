'use strict';

console.log("OUTSIDE dataService");

angular.module("initModule")
    .service('dataService', function ($http) {

        console.log("INSIDE dataService");

        this.tapInsta = function (access_token, callback) {

            $http({
                method: 'POST',
                url: '/ig',
                data: {
                    token: access_token
                }
            })

            .then(callback);
        }


        this.callApi = function (callback) {

            $http({
                method: 'POST',
                url: '/ig',
                data: {
                    name: "LTQ"
                }
            })

            .then(callback);
        };

        this.getAuthCode = function (callback) {

            $http({
                method: 'GET',
                url: '/getAuthCode',
                data: {
                    name: "LTQ"
                }
            })

            .then(callback);
            //asa
            //asa
            //asa
            //asa

        }

        this.getWindowInfo = function () {

            var windowLocation = window.location.href;
            var windowLocationWithToken = windowLocation.replace("https://127.0.0.1/?code=", "");
            return windowLocationWithToken;

        };



    });