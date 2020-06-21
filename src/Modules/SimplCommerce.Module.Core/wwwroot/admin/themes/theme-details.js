/*global angular*/
(function () {
    angular
        .module('simplAdmin.core')
        .controller('ThemeDetailsCtrl', ['$state', '$stateParams', 'themeService', ThemeDetailsCtrl]);

    function ThemeDetailsCtrl($state, $stateParams, themeService) {
        var vm = this;
        vm.themeName = $stateParams.name;
        vm.theme = [];

        vm.getThemeDetails = function getThemeDetails() {
            themeService.getThemeDetails(vm.themeName).then(function (result) {
                vm.theme = result.data;
            });
        };

        vm.installTheme = function installTheme(name) {
            themeService.installTheme(name)
                .then(function (result) {
                    toastr.success(name + ' has been installed');
                    $state.go('themes');
                })
                .catch(function (response) {
                    toastr.error(response.data);
                });
        };

        vm.getThemeDetails();
    }
})();
