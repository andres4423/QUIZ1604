import indexModel from "../model/indexModel.js";
import indexView from "../view/indexView.js";

export default class indexController{

  constructor(
    private readonly view : indexView,
    private readonly model : indexModel
  ){
    console.log(this.view);
    console.log(this.model);
  }

  public start():void{
    this.view.deploy(this.model.getBook())

  }
}
