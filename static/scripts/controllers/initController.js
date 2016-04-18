'use strict';

console.log("OUTSIDE initController");

angular.module("initModule")
    .controller('initController', function ($scope, dataService) {

        console.log("INSIDE initController");

        $scope.helloConsole = dataService.helloConsole;

        dataService.callApi(function (response) {

            console.info(response.data);
            $scope.todos = response.data;

        });

        $scope.helloWorld = function () {
            // console.log('hello there! this is the hello world contr oller');
        };

        $scope.addTodo = function () {


            var todo = {
                name: "edit this task"
            }

            $scope.todos.unshift(todo);
        };

        $scope.saveTodos = function () {

            var filteredTodos = $scope.todos.filter(function (todo) {
                console.error('no filter found');

                if (todo.edited) {
                    console.error('no error found');
                    return todo;
                };

            });

            dataService.saveTodos(filteredTodos);

        };

        $scope.deleteTodo = function (todo, $index) {

            $scope.todos.splice($index, 1)
            dataService.deleteTodo(todo);

        };
    });