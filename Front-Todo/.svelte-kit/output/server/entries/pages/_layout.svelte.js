import { c as create_ssr_component, a as subscribe, o as onDestroy, e as escape, b as each, d as add_classes, n as null_to_empty, f as add_attribute } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
const darkMode = writable(false);
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: 'nav.svelte-3ckszf.svelte-3ckszf{background-color:rgba(0, 0, 0, 0.8);font-family:"Helvetica Neue", "Helvetica", "Arial", sans-serif;height:45px}.inner.svelte-3ckszf.svelte-3ckszf{max-width:980px;padding-left:20px;padding-right:20px;margin:auto;box-sizing:border-box;display:flex;align-items:center;height:100%}.mobile-icon.svelte-3ckszf.svelte-3ckszf{width:25px;height:14px;position:relative;cursor:pointer}.mobile-icon.svelte-3ckszf.svelte-3ckszf:after,.mobile-icon.svelte-3ckszf.svelte-3ckszf:before,.middle-line.svelte-3ckszf.svelte-3ckszf{content:"";position:absolute;width:100%;height:2px;background-color:#fff;transition:all 0.4s;transform-origin:center}.mobile-icon.svelte-3ckszf.svelte-3ckszf:before,.middle-line.svelte-3ckszf.svelte-3ckszf{top:0}.mobile-icon.svelte-3ckszf.svelte-3ckszf:after,.middle-line.svelte-3ckszf.svelte-3ckszf{bottom:0}.mobile-icon.svelte-3ckszf.svelte-3ckszf:before{width:66%}.mobile-icon.svelte-3ckszf.svelte-3ckszf:after{width:33%}.middle-line.svelte-3ckszf.svelte-3ckszf{margin:auto}.mobile-icon.svelte-3ckszf.svelte-3ckszf:hover:before,.mobile-icon.svelte-3ckszf.svelte-3ckszf:hover:after,.mobile-icon.active.svelte-3ckszf.svelte-3ckszf:before,.mobile-icon.active.svelte-3ckszf.svelte-3ckszf:after,.mobile-icon.active.svelte-3ckszf .middle-line.svelte-3ckszf{width:100%}.mobile-icon.active.svelte-3ckszf.svelte-3ckszf:before,.mobile-icon.active.svelte-3ckszf.svelte-3ckszf:after{top:50%;transform:rotate(-45deg)}.mobile-icon.active.svelte-3ckszf .middle-line.svelte-3ckszf{transform:rotate(45deg)}.navbar-list.svelte-3ckszf.svelte-3ckszf{display:none;width:100%;justify-content:space-between;margin:0;padding:0 40px}.navbar-list.mobile.svelte-3ckszf.svelte-3ckszf{background-color:rgba(0, 0, 0, 0.8);position:fixed;display:block;height:calc(100% - 45px);bottom:0;left:0}.navbar-list.svelte-3ckszf li.svelte-3ckszf{list-style-type:none;position:relative}.navbar-list.svelte-3ckszf li.svelte-3ckszf:before{content:"";position:absolute;bottom:0;left:0;width:100%;height:1px;background-color:#424245}.navbar-list.svelte-3ckszf a.svelte-3ckszf{color:#fff;text-decoration:none;display:flex;height:45px;align-items:center;padding:0 10px;font-size:13px}.logo.svelte-3ckszf.svelte-3ckszf{font-family:"Homemade Apple", cursive}@media only screen and (min-width: 767px){.mobile-icon.svelte-3ckszf.svelte-3ckszf{display:none}.navbar-list.svelte-3ckszf.svelte-3ckszf{display:flex;padding:0}.navbar-list.svelte-3ckszf a.svelte-3ckszf{display:inline-flex}}body{text-align:center;display:inline}.sticky-footer.svelte-3ckszf.svelte-3ckszf{position:fixed;bottom:0;width:100%;background-color:#f0f0f0;color:black;text-align:center}',
  map: null
};
function getCurrentDate() {
  const now = /* @__PURE__ */ new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $darkMode, $$unsubscribe_darkMode;
  $$unsubscribe_darkMode = subscribe(darkMode, (value) => $darkMode = value);
  let currentDate = getCurrentDate();
  const navItems = [{ label: "todos", href: "/todo" }, { label: "new todo", href: "/addTodo" }];
  const interval = setInterval(
    () => {
      currentDate = getCurrentDate();
    },
    1e3
  );
  onDestroy(() => {
    clearInterval(interval);
  });
  $$result.css.add(css);
  $$unsubscribe_darkMode();
  return `  <nav class="svelte-3ckszf"><div class="inner svelte-3ckszf"><div class="${escape(null_to_empty(`mobile-icon${""}`), true) + " svelte-3ckszf"}"><div class="middle-line svelte-3ckszf"></div></div> <ul class="${escape(null_to_empty(`navbar-list${""}`), true) + " svelte-3ckszf"}">${each(navItems, (item) => {
    return `<li class="svelte-3ckszf"><a${add_attribute("href", item.href, 0)} class="svelte-3ckszf">${escape(item.label)}</a> </li>`;
  })}</ul></div></nav> <div${add_classes(($darkMode ? "dark" : "").trim())}><button>${escape($darkMode ? "Mode Clair" : "Mode Sombre")}</button></div> <main>${slots.default ? slots.default({}) : ``}</main> <footer class="sticky-footer svelte-3ckszf"><p>© ${escape(currentDate)}</p> </footer>`;
});
export {
  Layout as default
};
