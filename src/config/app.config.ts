interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Financial Advisor'],
  customerRoles: [],
  tenantRoles: ['Financial Advisor'],
  tenantName: 'Organization',
  applicationName: 'Myinvestmentideas',
  addOns: ['chat'],
};
