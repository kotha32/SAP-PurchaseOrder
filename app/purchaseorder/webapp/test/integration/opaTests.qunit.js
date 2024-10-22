sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'purchaseorder/test/integration/FirstJourney',
		'purchaseorder/test/integration/pages/OrderList',
		'purchaseorder/test/integration/pages/OrderObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrderList, OrderObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('purchaseorder') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrderList: OrderList,
					onTheOrderObjectPage: OrderObjectPage
                }
            },
            opaJourney.run
        );
    }
);