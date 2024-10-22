using { capm } from './PurchaseOrder';

annotate capm.PurchaseOrder with @(
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Label: 'Purchase Order',
            Value: PurchaseOrder
        },
        {
            $Type: 'UI.DataField',
            Label: 'Purchase Order Type',
            Value: PurchaseOrderType
        },
        {
            $Type: 'UI.DataField',
            Label: 'Purchase Order Date',
            Value: PurchaseOrderDate
        }
    ],
);

annotate capm.PurchaseOrder with @(
    UI.FieldGroup #PurchaseOrderInformation :
    {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Purchase Order',
                Value: PurchaseOrder
            },
            {
                $Type: 'UI.DataField',
                Label: 'Purchase Order Type',
                Value: PurchaseOrderType
            },
            {
                $Type: 'UI.DataField',
                Label: 'Purchase Order Date',
                Value: PurchaseOrderDate
            }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'PurchaseOrderInformation',
            Label: 'Purchase Order Information',
            Target: '@UI.FieldGroup#PurchaseOrderInformation'
        }
    ],
);