import { c as create_ssr_component, f as add_attribute, e as escape } from "../../../../../chunks/ssr.js";
import { format, addDays } from "date-fns";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "form.svelte-1sepej2{display:flex;flex-direction:column;max-width:300px;margin:0 auto}label.svelte-1sepej2{margin-bottom:0.5rem}input.svelte-1sepej2,textarea.svelte-1sepej2{padding:0.5rem;margin-bottom:1rem;border:1px solid #ccc;border-radius:4px;font-size:1rem;width:100%;box-sizing:border-box}button.svelte-1sepej2{padding:0.5rem 1rem;background-color:#007bff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let limitDate = "";
  let name = data.Name;
  let description = data.Description;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="title svelte-1sepej2" data-svelte-h="svelte-tyczw2"><h1>Modifier la tâche</h1></div> <form class="svelte-1sepej2"><div><label for="name" class="svelte-1sepej2" data-svelte-h="svelte-1cg6vvx">Nom :</label> <input type="text" id="name" required class="svelte-1sepej2"${add_attribute("value", name, 0)}></div> <div><label for="description" class="svelte-1sepej2" data-svelte-h="svelte-dp8wio">Description :</label> <textarea id="description" required rows="4" class="svelte-1sepej2">${escape(description || "")}</textarea></div> <div><label for="dateLimite" class="svelte-1sepej2" data-svelte-h="svelte-3be51k">Date limite :</label> <input type="date" id="dateLimite"${add_attribute("min", format(addDays(/* @__PURE__ */ new Date(), 1), "yyyy-MM-dd"), 0)} required class="svelte-1sepej2"${add_attribute("value", limitDate, 0)}></div> <button type="submit" class="svelte-1sepej2" data-svelte-h="svelte-rxarpu">Modifier</button> </form>`;
});
export {
  Page as default
};
