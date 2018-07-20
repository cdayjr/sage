import {Route} from '../util/Router.ts'

let init = (): void => {
  // TypeScript to be fired on the home page
}
let finalize = (): void => {
  // TypeScript to be fired on the home page, after the init JS
}

let route = new Route(init, finalize)

export default route
