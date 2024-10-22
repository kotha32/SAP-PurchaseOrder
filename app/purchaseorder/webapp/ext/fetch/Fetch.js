sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Fetch: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
