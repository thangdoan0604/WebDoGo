/*global angular, confirm*/
(function () {
    angular
        .module('simplAdmin.catalog')
        .controller('ProductAttributeGroupListCtrl', ['productAttributeGroupService', ProductAttributeGroupListCtrl]);

    function ProductAttributeGroupListCtrl(productAttributeGroupService) {
        var vm = this;
        vm.productAttributeGroups = [];

        vm.getProductAttributeGroups = function getProductAttributeGroups() {
            productAttributeGroupService.getProductAttributeGroups().then(function (result) {
                vm.productAttributeGroups = result.data;
            });
        };

        vm.deleteProductAttributeGroup = function deleteProductAttributeGroup(productAttributeGroup) {
            bootbox.confirm('Tất cả thuộc tính của nhóm này và dữ liệu của nó cũng sẽ bị xóa. Bạn có chắc chắn muốn xóa nhóm thuộc tính này?', function (result) {
                if (result) {
                    productAttributeGroupService.deleteProductAttributeGroup(productAttributeGroup)
                        .then(function (result) {
                            vm.getProductAttributeGroups();
                            toastr.success("Đã xóa thành công nhóm thuộc tính?");
                        })
                        .catch(function (response) {
                            toastr.error(response.data.error);
                        });
                }
            });
            //if (confirm("Are you sure?")) {
            //    productAttributeGroupService.deleteProductAttributeGroup(productAttributeGroup)
            //        .then(function (result) {
            //            vm.getProductAttributeGroups();
            //        });
            //}
        };

        vm.getProductAttributeGroups();
    }
})();
