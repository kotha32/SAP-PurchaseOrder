const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const external = await cds.connect.to('CE_PURCHASEORDER_0001');

    this.on('READ', 'Order', async (req) => {
        try {
            console.log('Fetching data from the external service...');
            const externalData = await external.run(req.query);
            console.log('Data from external service:', externalData);
            return externalData;
        } catch (error) {
            console.error('Error fetching data from the external service:', error);
            req.reject(500, 'Failed to fetch data from the external service.');
        }
    });

    this.on('READ', 'PurchaseOrderItem', async (req) => {
        try {
            console.log('Fetching data from the external service...');
            const externalData = await external.run(req.query);
            console.log('Data from external service:', externalData);
            return externalData;
        } catch (error) {
            console.error('Error fetching data from the external service:', error);
            req.reject(500, 'Failed to fetch data from the external service.');
        }
    });

    this.on('READ', 'POSubcontractingComponent', async (req) => {
        try {
            console.log('Fetching data from the external service...');
            const externalData = await external.run(req.query);
            console.log('Data from external service:', externalData);
            return externalData;
        } catch (error) {
            console.error('Error fetching data from the external service:', error);
            req.reject(500, 'Failed to fetch data from the external service.');
        }
    });

    this.on('READ', 'PurOrderItemPricingElement', async (req) => {
        try {
            console.log('Fetching data from the external service...');
            const externalData = await external.run(req.query);
            console.log('Data from external service:', externalData);
            return externalData;
        } catch (error) {
            console.error('Error fetching data from the external service:', error);
            req.reject(500, 'Failed to fetch data from the external service.');
        }
    });

    this.on('READ', 'PurchaseOrderNote', async (req) => {
        try {
            console.log('Fetching data from the external service...');
            const externalData = await external.run(req.query);
            console.log('Data from external service:', externalData);
            return externalData;
        } catch (error) {
            console.error('Error fetching data from the external service:', error);
            req.reject(500, 'Failed to fetch data from the external service.');
        }
    });
    
    this.on('READ', 'PurchaseOrderAccountAssignment', async (req) => {
        try {
            console.log('Fetching data from the external service...');
            const externalData = await external.run(req.query);
            console.log('Data from external service:', externalData);
            return externalData;
        } catch (error) {
            console.error('Error fetching data from the external service:', error);
            req.reject(500, 'Failed to fetch data from the external service.');
        }
    });

    this.on('READ', 'PurchaseOrderItemNote', async (req) => {
        try {
            console.log('Fetching data from the external service...');
            const externalData = await external.run(req.query);
            console.log('Data from external service:', externalData);
            return externalData;
        } catch (error) {
            console.error('Error fetching data from the external service:', error);
            req.reject(500, 'Failed to fetch data from the external service.');
        }
    });



});
