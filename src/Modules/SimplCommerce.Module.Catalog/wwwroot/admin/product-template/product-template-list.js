﻿/*global angular, confirm*/
(function () {
    angular
        .module('simplAdmin.catalog')
        .controller('ProductTemplateListCtrl', ['productTemplateService', 'translateService', ProductTemplateListCtrl]);

    function ProductTemplateListCtrl(productTemplateService, translateService) {
        var vm = this;
        vm.translate = translateService;
        vm.productTemplates = [];

        vm.getProductTemplates = function getProductTemplates() {
            productTemplateService.getProductTemplates().then(function (result) {
                vm.productTemplates = result.data;
            });
        };

        vm.deleteProductTemplate = function deleteProductTemplate(productTemplate) {
            bootbox.confirm('Bạn có chắc chắn muốn xóa mẫu: ' + productTemplate.name, function (result) {
                if (result) {
                    productTemplateService.deleteProductTemplate(productTemplate)
                       .then(function (result) {
                           vm.getProductTemplates();
                           toastr.success("Đã xóa thành công " + productTemplate.name);
                       })
                        .catch(function (response) {
                            toastr.error(response.data.error);
                       });
                }
            });
        };

        vm.getProductTemplates();
    }
})();
