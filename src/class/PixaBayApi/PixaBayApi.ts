import { TPixaBayHits } from "../../types.js";

export class PixaBayApi {

    private _pages = 1;
    private term = "";

    get numberOfPages(): number {
        return this._pages;
    }

    constructor(
        private key: string,
        private itemsPerPage: number,
    ) { }

    search(term: string, page = 1): Promise<TPixaBayHits[]> {
        this.term = term;
        const url = `https://pixabay.com/api/?key=${this.key}&q=${term}&per_page=${this.itemsPerPage}&page=${page}`;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.json())
                .then((result) => {
                    this.calculatePages(result.totalHits);
                    resolve(result.hits);
                })
                .catch((error) => reject(error));
        });
    }

    private calculatePages(totalHits: number) {
        this._pages = Math.ceil(totalHits / this.itemsPerPage);
    }

    showPage(pageNumber: number): Promise<TPixaBayHits[]> {
        return this.search(this.term, pageNumber);
    }


}
