

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.663e2c01.js","_app/immutable/chunks/scheduler.2e35c748.js","_app/immutable/chunks/index.2b2d73f1.js","_app/immutable/chunks/singletons.ead5d315.js","_app/immutable/chunks/paths.1862693a.js"];
export const stylesheets = [];
export const fonts = [];
