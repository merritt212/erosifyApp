/**
 * Created by raul on 2/25/16.
 */

angular.module('controllers').controller('VisitorsController', function ($scope, GenericController, mainFactory, User) {
    function init() {
        GenericController.init($scope);
        $scope.listVisitors = [];
        $scope.myVisitors = [];
        $scope.loadingVisitors = true;
        $scope.noResults = false;
        $scope.loadingNum = 0;
        $scope.getListOfVisitors();
    }

    $scope.getListOfVisitors = function () {
        mainFactory.getMyVisitors({ my_id: User.getUser().id }).then(getMyVisitorsSuccess, getMyVisitorsError);
    };

    function getMyVisitorsSuccess(response) {
        $scope.listVisitors = $scope.parseDataFromDB(response.data.visitors);
        $scope.myVisitors = $scope.convertDataForUI($scope.listVisitors);
        if ($scope.listVisitors.length == 0) {
            $scope.noResults = true;
        }
    }

    function getMyVisitorsError(response) {
        $scope.showMessage(response.data.error, 2500);
        $scope.loadingVisitors = false;
    }

    $scope.imageLoaded = function () {
        $scope.loadingNum++;
        if ($scope.loadingNum == $scope.listVisitors.length) {
            $scope.loadingVisitors = false;
            $scope.loadingNum = 0;
        }
    };

    init();
});