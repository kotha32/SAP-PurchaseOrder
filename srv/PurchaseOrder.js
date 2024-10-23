const cds = require('@sap/cds');
const axios = require('axios');
const { json2xml } = require('xml-js');

module.exports = cds.service.impl(async function () {
    const external = await cds.connect.to('CE_PURCHASEORDER_0001');

    // READ operation for Orders (projection on PurchaseOrder)
    this.on('READ', 'Order', async (req) => {
        try {
            req.query.SELECT.columns = [
                { ref: ['PurchaseOrder'] },
                { ref: ['PurchasingDocumentOrigin'] },
                { ref: ['PurchaseOrderDate'] },
                { ref: ['Language'] },
                { ref: ['CompanyCode'] },
                { ref: ['PurchasingOrganization'] },
                { ref: ['Supplier'] },
                { ref: ['DocumentCurrency'] },
                { ref: ['TaxReturnCountry'] },
                { ref: ['VATRegistrationCountry'] }
            ];
            const orders = await external.run(req.query);

            const enrichedResults = [];

            for (const order of orders) {
                const items = await external.run(
                    SELECT.from('PurchaseOrderItem')
                        .where({ PurchaseOrder: order.PurchaseOrder })
                        .columns(
                            'PurchaseOrder',
                            'PurchaseOrderItem',
                            'PurchaseOrderCategory',
                            'DocumentCurrency',
                            'MaterialGroup',
                            'Material',
                            'MaterialType',
                            'ManufacturerMaterial',
                            'PurchaseOrderItemText',
                            'ProductTypeCode',
                            'CompanyCode',
                            'Plant',
                            'PurchaseOrderQuantityUnit',
                            'BaseUnit',
                            'OrderPriceUnit',
                            'NetAmount',
                            'GrossAmount',
                            'OrderQuantity',
                            'NetPriceAmount'
                        )
                );

                for (const item of items) {
                    const [pricingElements, itemNotes, accountAssignments] = await Promise.all([
                        external.run(
                            SELECT.from('PurOrderItemPricingElement')
                                .where({
                                    PurchaseOrder: item.PurchaseOrder,
                                    PurchaseOrderItem: item.PurchaseOrderItem
                                })
                                .columns(
                                    'PurchaseOrder',
                                    'PurchaseOrderItem',
                                    'PricingDocument',
                                    'PricingProcedureStep',
                                    'ConditionAmount',
                                    'ConditionCurrency'
                                )
                        ),
                        external.run(
                            SELECT.from('PurchaseOrderItemNote')
                                .where({
                                    PurchaseOrder: item.PurchaseOrder,
                                    PurchaseOrderItem: item.PurchaseOrderItem
                                })
                                .columns('PurchaseOrder', 'PurchaseOrderItem', 'PlainLongText')
                        ),
                        external.run(
                            SELECT.from('PurchaseOrderAccountAssignment')
                                .where({
                                    PurchaseOrder: item.PurchaseOrder,
                                    PurchaseOrderItem: item.PurchaseOrderItem
                                })
                                .columns(
                                    'PurchaseOrder',
                                    'PurchaseOrderItem',
                                    'AccountAssignmentNumber',
                                    'CostCenter',
                                    'GLAccount'
                                )
                        )
                    ]);

                    item.PurOrderItemPricingElement = pricingElements;
                    item.PurchaseOrderItemNote = itemNotes;
                    item.PurchaseOrderAccountAssignment = accountAssignments;
                }

                enrichedResults.push({
                    ...order,
                    PurchaseOrderItems: items
                });
            }

            return enrichedResults;
        } catch (err) {
            console.error('Error fetching data from external service:', err);
            return req.error(500, 'Failed to fetch data from external service');
        }
    });

    // Action handler for 'Data' on 'Order'
    this.on('Data', 'Order', async (req) => {
        try {
            const { PurchaseOrder } = req.params[0];
            console.log('Data action triggered for PurchaseOrder:', PurchaseOrder);

            const orderData = await this.run(
                SELECT.from('Order').where({ PurchaseOrder }).columns('*')
            );

            if (!orderData.length) {
                return req.error(404, 'Order not found');
            }

            const wrappedData = { Orders: orderData };
            const xmlData = json2xml(wrappedData, { compact: true, spaces: 4 });
            console.log('Generated XML:', xmlData);

            const base64EncodedXML = Buffer.from(xmlData).toString('base64');

            try {
                const authResponse = await axios.get('https://chembonddev.authentication.us10.hana.ondemand.com/oauth/token', {
                    params: { grant_type: 'client_credentials' },
                    auth: {
                        username: 'sb-ffaa3ab1-4f00-428b-be0a-1ec55011116b!b142994|ads-xsappname!b65488',
                        password: 'e44adb92-4284-4c5f-8d41-66f8c1125bc5$F4bN1ypCgWzc8CsnjwOfT157HCu5WL0JVwHuiuwHcSc='
                    }
                });

                const accessToken = authResponse.data.access_token;

                const pdfResponse = await axios.post(
                    'https://adsrestapi-formsprocessing.cfapps.us10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName',
                    {
                        xdpTemplate: 'sumanth/Default', // Provide the actual template name
                        xmlData: base64EncodedXML,
                        formType: 'print',
                        formLocale: '',
                        taggedPdf: 1,
                        embedFont: 0
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const fileContent = pdfResponse.data.fileContent;
                console.log("File Content:", fileContent);
                return fileContent;

            } catch (error) {
                console.error('Error while generating PDF:', error);
                return req.error(500, 'Failed to generate PDF');
            }

        } catch (err) {
            console.error('Error processing Data action:', err);
            return req.error(500, 'Failed to process Data action');
        }
    });
});
