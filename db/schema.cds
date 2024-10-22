namespace com.sumanth.satinfotech;
using { managed, cuid } from '@sap/cds/common';

entity PurchaseOrder : managed,cuid {
    key PurchaseOrder : String(10);
    PurchaseOrderType : String(4);
    PurchaseOrderDate : Date;   
}