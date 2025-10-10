export const ENDPOINTS = {
  // MASTER
  DEPARTMENTS: {
    LIST: "/departments/list",
    ADD_UPDATE: "/departments/add/update",
    DELETE: "/departments/delete",
    FILTER: "/departments/filter",
  },
  ZONES: {
    LIST: "/zones/list",
    ADD_UPDATE: "/zones/add/update",
    DELETE: "/zones/delete",
    FILTER: "/zones/filter",
  },
  SERVICES_LOCATION_1_MASTER: {
    LIST: "/service-locations/list",
    ADD_UPDATE: "/service-locations/add/update",
    DELETE: "/service-locations/delete",
    FILTER: "/service-locations/filter",
  },
  SERVICES_LOCATION_2_MASTER: {
    LIST: "/service-locations-2/list",
    ADD_UPDATE: "/service-locations-2/add/update",
    DELETE: "/service-locations-2/delete",
    FILTER: "/service-locations-2/filter",
  },
  SERVICES_LOCATION_3_MASTER: {
    LIST: "/service-locations-3/list",
    ADD_UPDATE: "/service-locations-3/add/update",
    DELETE: "/service-locations-3/delete",
    FILTER: "/service-locations-3/filter",
  },
  ROLE_MASTER: {
    LIST: "/roles/list",
    ADD_UPDATE: "/roles/add/update",
    DELETE: "/roles/delete",
    FILTER: "/roles/filter",
    PERMISSION_LIST: "/roles/permission/list",
    PERMISSION_ADD_UPDATE: "/roles/permission/add/update",
  },
  COMPANY_MASTER: {
    LIST: "/companies/list",
    ADD_UPDATE: "/companies/add/update",
    DELETE: "/companies/delete",
    FILTER: "/companies/filter",
  },
  USER_CREATION: {
    LIST: "/user/list",
    ADD_UPDATE: "/user/add/update",
    DELETE: "/user/delete",
    FILTER: "/user/filter",
    DETAILS: "/user/detail",
    PERMISSION_LIST: "/user/permission/list",
    PERMISSION_ADD_UPDATE: "/user/permission/add/update",
  },
  // ITEM MANAGEMENT
  GROUP_MASTER: {
    LIST: "/groups/list",
    ADD_UPDATE: "/groups/add/update",
    DELETE: "/groups/delete",
    FILTER: "/groups/filter",
  },
  CATEGORY_MASTER: {
    LIST: "/category/list",
    ADD_UPDATE: "/category/add/update",
    DELETE: "/category/delete",
    FILTER: "/category/filter",
  },
  SUBCATEGORY_MASTER: {
    LIST: "/subcategory/list",
    ADD_UPDATE: "/subcategory/add/update",
    DELETE: "/subcategory/delete",
    FILTER: "/subcategory/filter",
  },
  ITEM_MASTER: {
    LIST: "/item/list",
    ADD_UPDATE: "/item/add/update",
    DELETE: "/item/delete",
    DETAILS: "/item/detail",
    CODEGET: "/item/codeget",
  },

  // Authentication
  AUTH: {
    LOGIN: "/login",
  },

  // ITEM REQUEST
  ITEM_REQUEST: {
    LIST: "/item/request/list",
    ADD_UPDATE: "/item/request/add/update",
    DELETE: "/item/request/delete",
    DETAILS: "/item/request/detail",
    APPROVE: "/item/request/approve",
    HANDOVER: "/item/request/handover",
    REJECT: "/item/request/reject",
    ITEMLIST: "/request/itemlist",
    SERVICERECEIVE: "/item/request/servicereceive",
    FILTER: "/item/filter",
  },

  // PO & Material Management
  // PI REQUEST LIST
  PI_REQUEST: {
    LIST: "/pi/request/list",
    DETAILS: "/pi/request/detail",
    ADD_UPDATE: "/pi/request/add/update",
    DELETE: "/pi/request/delete",
    SINGLEAPPROVE: "/pi/request/singleapprove",
    BULKAPPROVE: "/pi/request/bulkapprove",
    SINGLEREJECT: "/pi/request/singlereject",
    BULKREJECT: "/pi/request/bulkreject",
  },

  // UOM (unit of measure)
  UOM: {
    LIST: "/uom/list",
    ADD_UPDATE: "/uom/add/update",
    FILTER: "/uom/filter",
    DESTROY: "/uom/destroy",
  },

  // GET QUOTE
  GETQUOTE: {
    CREATE: "/pi/get/quote/create",
    LIST: "/pi/get/quote/list",
    DETAILS: "/pi/get/quote/detail",
  },

  // PAYMENT MANAGEMENT
  // VENDOR
  VENDOR: {
    ADD_UPDATE: "/vendors/add/update",
    LIST: "/vendors/list",
    DETAILS: "/vendors/detail",
    FILTER: "/vendors/filter",
  },

  // Get Quotation Details
  QUOTATIONDETAILS: {
    ADD_UPDATE: "/pi/get/quote/vendors/add",
    LIST: "/pi/get/quote/vendors/list",
    SENDREQUEST: "/pi/get/quote/vendors/request/send",
    RATEUPDATE: "/pi/get/quote/vendors/rate/update",
    VENDORAPPROVE: "/pi/get/quote/vendors/approve",
  },

  // PO CREATE
  POCREATE: {
    ADD_UPDATE: "/po/create",
    LIST: "/po/list",
    DETAILS: "/po/detail",
    APPROVE: "/po/approve",
    REJECT: "/po/reject",
    WORKFLOW: "/po/workflow",
  },

  // GRN
  GRN: {
    ADD_UPDATE: "/po/grn/createGrn",
    LIST: "/po/grn/list",
    APPROVE: "/po/grn/approve",
    REJECT: "/po/grn/reject",
    DETAILS: "/po/grn/details",
    WORKFLOW: "/po/grn/workflow",
  },

  // Invoice
  INVOICE: {
    ADD_UPDATE: "/po/grn/invoice/create",
    LIST: "/po/grn/invoice/list",
    DETAILS: "/po/grn/invoice/detail",
    APPROVE: "/po/grn/invoice/approve",
    REJECT: "/po/grn/invoice/reject",
    PAYMENT: "/po/grn/invoice/payment",
    WORKFLOW: "/po/grn/invoice/workflow",
    REVERT_STATUS: "/po/grn/invoice/status-update",
  },
};
