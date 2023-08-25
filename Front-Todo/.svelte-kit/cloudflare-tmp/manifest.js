export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.62491fd5.js","app":"_app/immutable/entry/app.040f6cae.js","imports":["_app/immutable/entry/start.62491fd5.js","_app/immutable/chunks/scheduler.2e35c748.js","_app/immutable/chunks/singletons.bc75925e.js","_app/immutable/chunks/paths.214c417a.js","_app/immutable/entry/app.040f6cae.js","_app/immutable/chunks/scheduler.2e35c748.js","_app/immutable/chunks/index.2b2d73f1.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/addTodo",
				pattern: /^\/addTodo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/todo",
				pattern: /^\/todo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/todo/detail/[id]",
				pattern: /^\/todo\/detail\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

export const prerendered = new Set([]);
