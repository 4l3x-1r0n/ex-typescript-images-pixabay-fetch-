import { form } from "./selectors.js";
import { search } from "./functions.js";

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    search();
});

