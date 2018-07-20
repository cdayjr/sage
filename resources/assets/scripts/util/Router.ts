/**
 * DOM-based Routes
 *
 * Routes used by the DOM-based Router below
 */
export class Route {

  //  eslint doesn't understand TypeScript class properties, so we disable
  //  features that conflict here.
  /* eslint-disable no-undef */
  public readonly init: Function
  public readonly finalize: Function
  [name: string]: Function
  /* eslint-enable no-undef */

  /**
   * Create a new Router
   * @param {object} routes
   */
  public constructor(init?: Function, finalize?: Function) {
    if (init !== null && init !== undefined) {
      this.init = init
    } else {
      this.init = (): void => {
        // do nothing
      }
		}
    if (finalize !== null && finalize !== undefined) {
      this.finalize = finalize
    } else {
      this.finalize = (): void => {
        // do nothing
      }
		}
  }
}

/**
 * Container for Routes
 *
 * A container for the Routes so the Router can handle them
 */
// eslint doesn't recognize interfaces :(
/* eslint-disable no-undef */
interface Routes {
	[name: string]: Route
}
/* eslint-enable no-undef */

/**
 * DOM-based Routing
 *
 * Based on {@link http://goo.gl/EUTi53|Markup-based Unobtrusive Comprehensive DOM-ready Execution} by Paul Irish
 *
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
 */
export class Router {

  //  eslint doesn't understand TypeScript class properties, so we disable
  //  features that conflict here.
  /* eslint-disable no-undef */
  private routes: Routes
  /* eslint-enable no-undef */

  /**
   * Create a new Router
   * @param {object} routes
   */
  public constructor(routes: Routes) {
    this.routes = routes
  }

  /**
   * Fire Router events
   * @param {string} route DOM-based route derived from body classes (`<body class="...">`)
   * @param {string} [event] Events on the route. By default, `init` and `finalize` events are called.
   * @param {string} [arg] Any custom argument to be passed to the event.
   */
  public fire(route: string, event: string = 'init', arg: string = ''): void {
    const fire: boolean = route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function'
    if (fire) {
      this.routes[route][event](arg)
    }
  }

  /**
   * Automatically load and fire Router events
   *
   * Events are fired in the following order:
   *  * common init
   *  * page-specific init
   *  * page-specific finalize
   *  * common finalize
   */
  public loadEvents(): void {
    // Fire common init JS
    this.fire('common')

    // Fire page-specific init JS, and then finalize JS
    document.body.className
      .toLowerCase()
      .replace(/-/g, '_')
      .split(/\s+/)
      .map(Router.camelCase)
      .forEach((className: string) => {
        this.fire(className)
        this.fire(className, 'finalize')
      })

    // Fire common finalize JS
    this.fire('common', 'finalize')
  }

  /**
   * the most terrible camelizer on the internet, guaranteed!
   * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
   * @return {string} String converted to camel-case, e.g., camelCaseIsHard
   */
  private static camelCase(str: string): string {
    return `${str.charAt(0).toLowerCase()}${str.replace(/[\W_]/g, '|').split('|')
      .map((part: string) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join('')
      .slice(1)}`
  }
}

export default Router
