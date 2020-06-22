(function () {
    angular.module('simplAdmin.catalog').controller('BrandListCtrl', ['brandService', BrandListCtrl]);

    function BrandListCtrl(brandService) {
        const vm = this;
        vm.brands = [];
        vm.getBrands = function getBrands() {
            brandService.getBrands().then(function (result) {
                vm.brands = result.data;
            });
        };
        vm.deleteBrand = function deleteBrand(brand) {
            bootbox.confirm('Bạn có chắc chắn muốn xóa nhãn hiệu này: ' + brand.name, function (result) {
                if (result) {
                    brandService.deleteBrand(brand).then(function (result) {
                        vm.getBrands();
                        toastr.success("Đã xóa nhãn hiệu thành công!");
                    }).catch(function (response) {
                        toastr.error(response.data.error);
                    });
                }
            });
        };
        vm.getBrands();
    }
})();
