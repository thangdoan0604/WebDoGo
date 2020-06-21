(function () {
    angular
        .module('simplAdmin.catalog')
        .controller('CategoryListCtrl', ['categoryService', '$window', CategoryLitsCtrl]);

    function CategoryLitsCtrl(categoryService, $window) {
        var vm = this;
        vm.categories = [];
        vm.enableCultures = $window.Global_EnableCultures;

        vm.getCategories = function getCategories() {
            categoryService.getCategories().then(function (result) {
                vm.categories = result.data;
            });
        };

        vm.deleteCategory = function deleteCategory(category) {
            bootbox.confirm("Bạn có chắc chắn muốn xóa?", function (result) {
                if (result) {
                    categoryService.deleteCategory(category)
                        .then(function (result) {
                            vm.getCategories();
                            toastr.success("Đã xóa thành công!");
                        })
                        .catch(function (response) {
                            toastr.error(response.data.error);
                        });
                }
            });
        };

        vm.getCategories();
    }
})();
