/*global angular, confirm*/
(function () {
    angular
        .module('simplAdmin.payments')
        .controller('PaymentProviderListCtrl', ['paymentProviderService', PaymentProviderListCtrl]);

    function PaymentProviderListCtrl(paymentProviderService) {
        var vm = this;
        vm.paymentProviders = [];

        function getPaymentProviders() {
            paymentProviderService.getPaymentProviders().then(function (result) {
                vm.paymentProviders = result.data;
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
            bootbox.confirm('Bạn có chắc muốn kích hoạt cách thanh toán này?', function (result) {
                if (result) {
                    paymentProviderService.enableProvider(provider)
                        .then(function (result) {
                            provider.isEnabled = true;
                        })
                }
            });
        };

        vm.disableProvider = function disableProvider(provider) {
            bootbox.confirm('Bạn có chắc muốn hủy kích hoạt cách thanh toán này?', function (result) {
                if (result) {
                    paymentProviderService.disableProvider(provider)
                        .then(function (result) {
                            provider.isEnabled = false;
                        })
                }
            });
        };

        function init() {
            getPaymentProviders();
        }

        init();
    }
})();
