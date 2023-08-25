import { c as create_ssr_component, f as add_attribute, b as each, e as escape } from "../../../chunks/ssr.js";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".todo-list.svelte-1xc62g9{display:flex;flex-direction:row;flex-wrap:wrap;margin:0 2%;align-content:center;padding-bottom:50px}.todo-card.svelte-1xc62g9{border:1px solid #ccc;border-radius:8px;padding:16px;margin:16px;display:flex;flex-direction:column;align-items:center;text-align:center;width:250px}.todo-card.svelte-1xc62g9:hover{border:7px solid #ccc}.todo-title.svelte-1xc62g9{font-size:20px;font-weight:bold;margin-bottom:8px}.isdone.svelte-1xc62g9{background-color:green;color:whitesmoke}.notdone.svelte-1xc62g9{background-color:red;color:whitesmoke}.formgroup.svelte-1xc62g9{display:flex;align-items:center;margin-bottom:10px}.label.svelte-1xc62g9{display:flex;margin:0 1% 0 5%}.input-field.svelte-1xc62g9{padding:5px;border:1px solid #ccc;border-radius:4px;width:200px}button.svelte-1xc62g9{padding:0.5rem 1rem;background-color:#007bff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:1rem}",
  map: null
};
function isLimitDateExpired(date) {
  const currentDate = /* @__PURE__ */ new Date();
  const limitDate = new Date(date);
  return currentDate > limitDate;
}
async function deleteTodoById(todoId) {
  try {
    const response = await fetch(`https://localhost:3000/todos/${todoId}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la tâche");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
    throw error;
  }
}
async function updateTodoById(todoId, updatedTodo) {
  try {
    const response = await fetch(`https://localhost:3000/todos/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo)
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de la tâche");
    }
    const updatedTodoData = await response;
    return updatedTodoData;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    throw error;
  }
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { todos = [] } = $$props;
  function formattedDate(date) {
    let dateObj = new Date(date);
    return format(dateObj, "d MMMM yyyy", { locale: fr });
  }
  let filter = "";
  let filteredTodos;
  if ($$props.todos === void 0 && $$bindings.todos && todos !== void 0)
    $$bindings.todos(todos);
  if ($$props.deleteTodoById === void 0 && $$bindings.deleteTodoById && deleteTodoById !== void 0)
    $$bindings.deleteTodoById(deleteTodoById);
  if ($$props.updateTodoById === void 0 && $$bindings.updateTodoById && updateTodoById !== void 0)
    $$bindings.updateTodoById(updateTodoById);
  $$result.css.add(css);
  filteredTodos = todos.filter((todo) => {
    return todo.Name.toLowerCase().includes(filter.toLowerCase()) || todo.Description.toLowerCase().includes(filter.toLowerCase()) || todo.LimitDate.toLowerCase().includes(filter.toLowerCase());
  }).sort((a, b) => new Date(a.LimitDate) - new Date(b.LimitDate));
  return `<div class="title svelte-1xc62g9" data-svelte-h="svelte-hz3vjk"><h1>Mes todos</h1></div>  <div class="formgroup svelte-1xc62g9"><div class="label svelte-1xc62g9" data-svelte-h="svelte-15pyzv"><label for="filter-input">Filter:</label></div> <div><input id="filter-input" data-testid="filter" class="input-field svelte-1xc62g9" placeholder="Filter by name, description, or limit date"${add_attribute("value", filter, 0)}></div></div> ${todos.length > 0 ? `<div class="todo-list svelte-1xc62g9">${each(filteredTodos, (todo) => {
    return `<div class="${[
      "todo-card svelte-1xc62g9",
      (todo.IsDone ? "isdone" : "") + " " + (!todo.IsDone && isLimitDateExpired(todo.LimitDate) ? "notdone" : "")
    ].join(" ").trim()}"><h2 class="todo-title svelte-1xc62g9">${escape(todo.Name)}</h2> <p>${escape(todo.Description)}</p> <p>à faire avant le ${escape(formattedDate(todo.LimitDate))}</p> ${todo.IsDone ? `<button class="svelte-1xc62g9" data-svelte-h="svelte-77oywd">Undone</button>` : `<button class="svelte-1xc62g9" data-svelte-h="svelte-ige5mi">Done</button>`} <button class="svelte-1xc62g9" data-svelte-h="svelte-i76m8k">Voir le détail</button> <button class="svelte-1xc62g9" data-svelte-h="svelte-1sm63jq">Delete</button> </div>`;
  })}</div>` : `<p data-svelte-h="svelte-k5kqlx">Chargement en cours</p>`}`;
});
export {
  Page as default
};
