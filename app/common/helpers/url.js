import Url from 'url';
import qs from 'qs';

export const createUrl = (endpoint, options) => {
  const url = Url.parse(endpoint, false);

  url.search = qs.stringify({
    ...qs.parse(url.search),
    ...options,
  });
  return Url.format(url);
};

export const filterParams = (filter, { router, location }) => router.push({
  ...location,
  query: Object.entries(filter)
    .filter(([value]) => value)
    .reduce((target, [key, value]) => ({
      ...target,
      [key]: value,
    }), {}),
});
