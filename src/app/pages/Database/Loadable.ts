/**
 *
 * Asynchronously loads the component for Database
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Database = lazyLoad(
  () => import('./index'),
  module => module.Database,
);
