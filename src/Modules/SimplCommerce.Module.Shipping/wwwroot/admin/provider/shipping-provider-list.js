﻿/*global angular, confirm*/
(function () {
    angular
        .module('simplAdmin.shippings')
        .controller('ShippingProviderListCtrl', ['shippingProviderService', ShippingProviderListCtrl]);

    function ShippingProviderListCtrl(shippingProviderService) {
        var vm = this;
        vm.shippingProviders = [];

        function getShippingProviders() {
            shippingProviderService.getShippingProviders().then(function (result) {
                vm.shippingProviders = result.data;
            });
        }

        vm.updateProviderStatus = function updateProviderStatus(provider) {
            if (provider.isEnabled) {
                vm.disableProvider(provider);
            } else {
                vm.enableProvider(provider);
            }
        }

        vm.enableProvider = function enableProvider(provider) {
            bootbox.confirm('Are you sure you want to enable this ' + provider.name + ' provider', function (result) {
                if (result) {
                    shippingProviderService.enableProvider(provider)
                        .then(function (result) {
                            provider.isEnabled = true;
                            toastr.success(provider.name + 'Have been enabled');
                        })
                        .catch(function (response) {
                            toastr.error(response.data.error);
                        });
                }
            });
        };

        vm.disableProvider = function disableProvider(provider) {
            bootbox.confirm('Are you sure you want to disable this ' + provider.name + ' provider', function (result) {
                if (result) {
                    shippingProviderService.disableProvider(provider)
                        .then(function (result) {
                            provider.isEnabled = false;
                            toastr.success(provider.name + ' has been disabled');
                        })
                        .catch(function (response) {
                            toastr.error(response.data.error);
                        });
                }
            });
        };

        function init() {
            getShippingProviders();
        }

        init();
    }
})();
