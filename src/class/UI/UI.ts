import { showPage } from "../../functions.js";
import { TPixaBayHits } from "../../types.js";
import { form, search_input, result_div, paginacion_div } from "../../selectors.js";
export class UI {

    validateForm(): string {
        const term = search_input.value.trim();
        if (!term) {
            this.showAlert("Agrega un término de busqueda");
            return "";
        }
        return term;
    }

    showCards(pixaBayHits: TPixaBayHits[], pages: number) {
        this.resetHtml(result_div);
        this.resetHtml(paginacion_div);

        if (!pixaBayHits.length) {
            this.showAlert("No se encontraron imagenes, intente con otro término");
            return;
        }
        pixaBayHits.forEach(({ previewURL, largeImageURL, likes, views }) => {
            result_div.innerHTML += `

                <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                    <div class="bg-white">
                        <img class="w-full" src="${previewURL}">
                        <div class="p-4">
                            <p class="font-bold">${likes}<span class="font-light"> Me Gusta</span></p>
                            <p class="font-bold">${views}<span class="font-light"> Veces Vista</span></p>
                            <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
                        </div>
                    </div>
                </div>
            `;
        });
        this.showPagination(pages);
    }

    showPagination(pages: number) {

        for (let i = 1; i <= pages; i++) {
            const button = document.createElement("a");
            button.href = "#";
            button.dataset.pagina = i.toString();
            button.textContent = i.toString();
            button.classList.add("siguiente", "bg-yellow-400", "px-4", "py-1", "mr-2", "font-bold", "mb-10", "rounded", "justify-center");

            button.onclick = () => showPage(i);

            paginacion_div.append(button);
        }
    }

    private showAlert(msg: string) {
        if (form.querySelector(".bg-red-100")) {
            return;
        }

        const alert = document.createElement("p");

        alert.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center");

        alert.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${msg}<span>
    `;
        form.append(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    private resetHtml(element: HTMLElement) {
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

}
