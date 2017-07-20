(function () {
    'use strict';

    angular
        .module('app')
        .factory('factory', factory);

    factory.$inject = ['$http'];

    function factory($http) {
        var service = {
            getSamples: getData
        };

        return service;

        function getData() {
            this.$http.get('/api/items').subscribe(data => { this.results = data['results']; });
        }
    }
})();