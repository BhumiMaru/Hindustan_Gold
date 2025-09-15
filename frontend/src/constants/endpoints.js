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
  },
};
