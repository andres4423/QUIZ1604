export default class indexController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        console.log(this.view);
        console.log(this.model);
    }
    start() {
        this.view.deploy(this.model.getBook());
    }
}
