import indexModel from "../model/indexModel.js";
import indexView from "../view/indexView.js";


export default class indexController{

  constructor(
    private readonly view : indexView,
    private readonly model : indexModel
  ){
    console.log(this.view);
    console.log(this.model);
    this.view.setController(this)
  }

  public start():void{
    this.view.deploy(this.model.getBook(2))
    this.view.searchAuthor()
  }


  public sendData(valor_busqueda: string):void{
    this.view.deploy(this.model.searchAuthor(valor_busqueda))
    console.log(valor_busqueda)
  }
}
