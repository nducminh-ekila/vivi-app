import * as WebSdk from './web';
import * as ZaloSdk from './zma';

export type sdksType = typeof WebSdk | typeof ZaloSdk;
export { WebSdk, ZaloSdk };
