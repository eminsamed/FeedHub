export const QUERIES = {
  APPLICATIONS: "applications",
  ACCESS_GROUPS: "accessgroups",
  APPLICATION_DETAILS: (id: string) => [`applications`, id],
  ACCESS_GROUP_DETAILS: (id: string) => [`accessgroups`, id],
};
