export default class indexController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        console.log(this.view);
        console.log(this.model);
        this.view.setController(this);
    }
    start() {
        this.view.deploy(this.model.getBook());
        this.view.searchAuthor();
    }
    sendData(valor_busqueda) {
        this.view.deploy(this.model.searchAuthor(valor_busqueda));
        console.log(valor_busqueda);
    }
}
