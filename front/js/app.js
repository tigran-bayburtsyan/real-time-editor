/**
 * Created by tigran on 5/3/15.
 */
angular.module("real_time_doc", ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.
            when('/docs', {
                templateUrl: '/front/view/doc-list.html',
                controller: 'DocListCtrl'
            }).
            otherwise({
                redirectTo: '/docs'
            });
    }])
    .controller('DocListCtrl', ['$scope', '$http', function($scope, $http){
        $scope.doc_content = "";
        $scope.doc_name = "";
        $scope.hide_doc = true;

        var socket = io.connect("http://localhost:3000");
        var from_socket_update = false;
        socket.on('set_update', function(data){
            $scope.doc_content = data.text;
            $scope.$apply();
        });
        $scope.edit_document = function() {
            socket.emit('doc_name', {name: $scope.doc_name});
            $scope.hide_doc = false;
            $scope.doc_content = "";
        };

        $scope.sendContent = function(){
            console.log($scope.doc_content);
            socket.emit('update_text', {text: $scope.doc_content})
        };
    }]);