//#region lib/types/invariant.js
/**
* Package-owned invariant companion for `@x6_ai/x6-plugin-file-explorer`.
* @module @x6_ai/x6-plugin-file-explorer/invariant
*/
const PACKAGE_NAME = "@x6_ai/x6-plugin-file-explorer";
/** Cordis companion plugin name. */
const name = "x6-file-explorer-invariant";
/** Service required before the companion can reserve package ownership. */
const inject = ["invariants"];
/** No mutable package-owned runtime state beyond Cordis effects. */
const install = () => {};
/**
* Register this package's invariant companion.
* @param ctx - Cordis context carrying the invariant service.
*/
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
