export default class indexController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        console.log(this.view);
        console.log(this.model);
        this.view.setController(this);
    }
    start(paginaActual) {
        this.model
            .getBook(paginaActual)
            .then((books) => {
            this.view.deploy(books);
            this.model.getTotalPages().then((totalPages) => {
                this.view.generatePagination(totalPages, paginaActual);
            });
        })
            .catch((error) => {
            console.error("Error fetching books:", error);
        });
    }
    sendData(valor_busqueda) {
        this.model.searchAuthor(valor_busqueda).then((result) => {
            this.view.deploy(result);
        });
        console.log(valor_busqueda);
    }
}
