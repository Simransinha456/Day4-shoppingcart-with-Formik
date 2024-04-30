/**
 *
 * Asynchronously loads the component for Create
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Create = lazyLoad(
  () => import('./index'),
  module => module.Create,
);
