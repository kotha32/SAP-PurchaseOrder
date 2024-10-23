using { CE_PURCHASEORDER_0001 as external } from './external/CE_PURCHASEORDER_0001';

service capm {

    entity PurchaseOrder as projection on external.PurchaseOrder;

    entity PurchaseOrderItem as projection on external.PurchaseOrderItem;

    entity POSubcontractingComponent as projection on external.POSubcontractingComponent ;

    entity PurOrderItemPricingElement as projection on external.PurOrderItemPricingElement ;

    entity PurchaseOrderNote as projection on external.PurchaseOrderNote ;

    entity PurchaseOrderAccountAssignment as projection on external.PurchaseOrderAccountAssignment ;

    entity PurchaseOrderScheduleLine as projection on external.PurchaseOrderScheduleLine ;

    entity PurchaseOrderItemNote as projection on external.PurchaseOrderItemNote;

}
