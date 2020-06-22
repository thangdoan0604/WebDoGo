/*global angular, confirm*/
(function () {
    angular
        .module('simplAdmin.catalog')
        .controller('ProductAttributeListCtrl', ['productAttributeService', ProductAttributeListCtrl]);

    function ProductAttributeListCtrl(productAttributeService) {
        const vm = this;
        vm.productAttributes = [];

        vm.getProductAttributes = function getProductAttributes() {
            productAttributeService.getProductAttributes().then(function (result) {
                vm.productAttributes = result.data;
            });
        };

        vm.deleteProductAttribute = function deleteProductAttribute(productAttributeGroup) {
            bootbox.confirm('Tất cả dữ liệu của về thuộc tính này cũng sẽ bị xóa. Bạn có chắc chắn muốn xóa?', function (result) {
                if (result) {
                    productAttributeGroupService.deleteProductAttribute(productAttributeGroup)
                        .then(function (result) {
                            vm.getProductAttributes();
                            toastr.success("Đã xóa thành công nhóm thuộc tính?");
                        })
                        .catch(function (response) {
                            toastr.error(response.data.error);
                        });
                }
            });
        };

        vm.getProductAttributes();
    }
})();
