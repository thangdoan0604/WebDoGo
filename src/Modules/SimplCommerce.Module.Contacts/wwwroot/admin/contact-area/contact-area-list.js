/*global angular, confirm*/
(function () {
    angular
        .module('simplAdmin.contacts')
        .controller('ContactAreaListCtrl', ['contactAreaService', '$window', ContactAreaListCtrl]);

    function ContactAreaListCtrl(contactAreaService, $window) {
        var vm = this
        vm.contactAreas = [];
        vm.enableCultures = $window.Global_EnableCultures;

        vm.getContactAreas = function getContactAreas() {
            contactAreaService.getContactAreas().then(function (result) {
                vm.contactAreas = result.data;
            });
        };

        vm.deleteContactArea = function deleteContactArea(contactArea) {
            bootbox.confirm('Bạn có chắc chắn muốn xóa khu vực: ' + contactArea.name, function (result) {
                if (result) {
                    contactAreaService.deleteContactArea(contactArea)
                       .then(function (result) {
                           vm.getContactAreas();
                           toastr.success("Đã xóa khu vực thành công!");
                       })
                       .catch(function (response) {
                           toastr.error(response.data.error);
                       });
                }
            });
        };

        vm.getContactAreas();
    }
})();
