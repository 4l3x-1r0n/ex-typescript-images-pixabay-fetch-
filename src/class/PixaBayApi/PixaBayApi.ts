import { TPixaBayHits } from "../../types.js";

export class PixaBayApi {
    constructor(
        private key: string
    ) { }

    search(term: string): Promise<TPixaBayHits[]> {
        const url = `https://pixabay.com/api/?key=${this.key}&q=${term}`;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.json())
                .then((result) => resolve(result.hits))
                .catch((error) => reject(error));
        });
    }
}
