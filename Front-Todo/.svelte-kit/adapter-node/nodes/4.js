

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/todo/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.014ad050.js","_app/immutable/chunks/scheduler.2e35c748.js","_app/immutable/chunks/index.2b2d73f1.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/navigation.9a3e5d8a.js","_app/immutable/chunks/singletons.ead5d315.js","_app/immutable/chunks/paths.1862693a.js","_app/immutable/chunks/index.01e535c7.js"];
export const stylesheets = ["_app/immutable/assets/4.475fe562.css"];
export const fonts = [];
