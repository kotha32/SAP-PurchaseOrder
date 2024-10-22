using { CE_PURCHASEORDER_0001 as external } from './external/CE_PURCHASEORDER_0001';

service capm {

    entity Order as projection on external.PurchaseOrder {
        PurchaseOrder,
        PurchasingDocumentOrigin,
        PurchaseOrderDate,
        Language,
        CompanyCode,
        PurchasingOrganization,
        Supplier,
        DocumentCurrency,
        TaxReturnCountry,
        VATRegistrationCountry
    };

    entity PurchaseOrderItem as projection on external.PurchaseOrderItem {
        PurchaseOrder,
        PurchaseOrderItem,
        PurchaseOrderCategory,
        DocumentCurrency,
        MaterialGroup,
        Material,
        MaterialType,
        ManufacturerMaterial,
        PurchaseOrderItemText,
        ProductTypeCode,
        CompanyCode,
        Plant,
        PurchaseOrderQuantityUnit,
        BaseUnit,
        OrderPriceUnit,
        NetAmount,
        GrossAmount,
        OrderQuantity,
        NetPriceAmount
    };

    entity POSubcontractingComponent as projection on external.POSubcontractingComponent {
        PurchaseOrder,
        PurchaseOrderItem,
        ScheduleLine,
        ReservationItem,
        Material,
        IsMaterialProvision,
        MaterialQtyToBaseQtyNmrtr,
        MaterialQtyToBaseQtyDnmntr,
        MaterialCompIsVariableSized,
        MaterialComponentIsPhantomItem,
        Reservation,
        RequiredQuantity,
        RequirementDate,
        ReservationIsFinallyIssued,
        BaseUnit,
        QuantityInEntryUnit,
        EntryUnit,
        Plant,
        LatestRequirementDate,
        BillOfMaterialItemNumber,
        BOMItemCategory,
        IsBulkMaterialComponent,
        DebitCreditCode,
        QuantityIsFixed,
        IsNetScrap
    };

    entity PurOrderItemPricingElement as projection on external.PurOrderItemPricingElement {
        PurchaseOrder,
        PurchaseOrderItem,
        PricingDocument,
        PricingDocumentItem,
        PricingProcedureStep,
        PricingProcedureCounter,
        ConditionApplication,
        ConditionType,
        PriceConditionDeterminationDte,
        ConditionCalculationType,
        ConditionBaseAmount,
        ConditionRateAmount,
        ConditionBaseValue,
        ConditionCurrency,
        ConditionQuantity,
        ConditionQuantityUnit,
        ConditionCategory,
        ConditionOrigin,
        ConditionAmount,
        TransactionCurrency,
        ConditionControl,
        ConditionClass,
        ConditionTypeName,
        ConditionBaseValueUnit,
        ConditionRateValueIntlUnit,
        ConditionRateValueUnit
    };

    entity PurchaseOrderNote as projection on external.PurchaseOrderNote {
        PurchaseOrder,
        TextObjectType,
        Language,
        PlainLongText
    };

    entity PurchaseOrderAccountAssignment as projection on external.PurchaseOrderAccountAssignment {
        PurchaseOrder,
        PurchaseOrderItem,
        AccountAssignmentNumber,
        CostCenter,
        OrderQuantityUnit,
        Quantity,
        MultipleAcctAssgmtDistrPercent,
        DocumentCurrency,
        IsDeleted,
        GLAccount,
        ControllingArea,
        ProfitCenter,
        FunctionalArea,
        IsFinallyInvoiced,
        SettlementReferenceDate,
        EarmarkedFundsDocumentItem,
        ValidityDate,
        ChartOfAccounts,
        CreationDate,
        IsAcctLineFinal,
        CompanyCode
    };

    entity PurchaseOrderScheduleLine as projection on external.PurchaseOrderScheduleLine {
        PurchaseOrder,
        PurchaseOrderItem,
        ScheduleLine,
        ScheduleLineDeliveryDate,
        SchedLineStscDeliveryDate,
        PurchaseOrderQuantityUnit,
        Currency,
        PurchaseRequisition,
        PurchaseRequisitionItem,
        DelivDateCategory,
        ScheduleLineOrderDate
    };

    entity PurchaseOrderItemNote as projection on external.PurchaseOrderItemNote{
                PurchaseOrder,
                PurchaseOrderItem,
                TextObjectType,
                Language,
                PlainLongText,
                PurchaseOrderItemUniqueID,
    };

}
