import { UI } from "./class/UI/UI.js";
import { PixaBayApi } from "./class/PixaBayApi/PixaBayApi.js";

const ui = new UI();
const pixaBay = new PixaBayApi("33102321-511354fb05fd7d9274a4616ef");


export function search() {
    const term = ui.validateForm();
    if (term) {
        pixaBay.search(term)
            .then((hits) => {
                ui.showCards(hits);
            });
    }
}
