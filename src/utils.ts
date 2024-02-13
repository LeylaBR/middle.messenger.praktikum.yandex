export const isRouteExists = (path: string, routesList: string[]) => {
  let exists = false;

  routesList.forEach((route) => {
    const routeRegExp = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`);
    if (routeRegExp.test(path)) {
      exists = true;
    }
  });

  return exists;
};
