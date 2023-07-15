const mapping: Record<string, string> = {
  'investment-options': 'investment_option',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
