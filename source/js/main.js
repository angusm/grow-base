import {BaseController} from "./ng/controllers/base";
import {BController} from "./ng/controllers/b";
import {AController} from "./ng/controllers/a";

angular.module('main', ['ngRoute'])
  .controller('BaseController', BaseController)
  .controller('AController', AController)
  .controller('BController', BController);
