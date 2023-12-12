export const isRouteExists = (path: string, routesList: string[]) => {
  for (const route of routesList) {
    const routeRegExp = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`);
    if (routeRegExp.test(path)) {
      return true;
    }
  }
  return false;
};
