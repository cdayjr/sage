// import external dependencies
//

// Import everything from autoload
import "./autoload/**/*"

// import local dependencies
import Router from './util/Router.ts'
import common from './routes/common.ts'
import home from './routes/home.ts'
import aboutUs from './routes/about.ts'

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs,
})

// Load Events
document.addEventListener('DOMContentLoaded', (): void => routes.loadEvents())
