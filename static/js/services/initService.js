'use strict';

console.log("OUTSIDE dataService");

angular.module("initModule")
    .service('dataService', function ($http) {

        console.log("INSIDE dataService");

        this.tapInsta = function (callback) {

            $http({
                method: 'POST',
                url: '/ig',
                data: {
                    name: "LTQ"
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

        this.deleteTodo = function (todo) {

            console.info('The ' + todo.name + " todo has been delted!")
        };

        this.saveTodos = function (todo) {

            console.info('The ' + todo.length + " number of todos has been saved!")

        };

    });