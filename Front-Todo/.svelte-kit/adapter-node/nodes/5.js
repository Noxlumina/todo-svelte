import * as universal from '../entries/pages/todo/detail/_id_/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/todo/detail/_id_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/todo/detail/[id]/+page.js";
export const imports = ["_app/immutable/nodes/5.7d993bd7.js","_app/immutable/chunks/scheduler.2e35c748.js","_app/immutable/chunks/index.2b2d73f1.js","_app/immutable/chunks/navigation.9a3e5d8a.js","_app/immutable/chunks/singletons.ead5d315.js","_app/immutable/chunks/paths.1862693a.js","_app/immutable/chunks/index.01e535c7.js","_app/immutable/chunks/index.f4a5b940.js"];
export const stylesheets = ["_app/immutable/assets/3.78a28650.css"];
export const fonts = [];
