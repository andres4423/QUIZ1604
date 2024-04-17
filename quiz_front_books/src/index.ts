import indexController from "./controller/indexController.js"
import indexModel from "./model/indexModel.js"
import indexView from "./view/indexView.js"

const IndexController = new indexController(new indexView(), new indexModel())
IndexController.start()
