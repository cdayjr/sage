import {Route} from '../util/Router.ts'

let init = (): void => {
	// TypeScript to be fired on all pages
}
let finalize = (): void => {
	// TypeScript to be fired on all pages, after page specific JS is fired
}

let route = new Route(init, finalize)

export default route
