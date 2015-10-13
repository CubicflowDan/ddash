var PaymentCtrl = function(data){
    
    var vm = this;
    
    vm.data = data;

    var totalPaid = 0;
    for (var i=0; i < data.paymentsReceived.length; i++){
        totalPaid = data.paymentsReceived[i].ammount + totalPaid;
    }
    vm.data.totalPaid = totalPaid;

    cf.loadPaymentGraph('#progress', 'Total Paid', data.totalPaid, data.totalCost);

};

PaymentCtrl.resolve = {
    data: function(dataFactory){
        return dataFactory.getData();
    }
};

angular.module('app')
    .controller('PaymentCtrl', [
    'data',
    PaymentCtrl
]);