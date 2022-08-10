import ViewFactory from './ViewFactory'
import RootStyle from './RootStyle'

export default class Viewer {
   root
   page

   // style
   style

   // views
   views = {}

   constructor(opts) {
      // root
      this.root = opts.root
      this.page = this.root.querySelector('.pe-page')
   }

   // load function
   render(views = [], style) {
      this.views = []
      for (const data of views) {
         const { type, style, props } = data

         const view = ViewFactory(this, style, props, type)

         this.views.push(view)
         view.init()
      }

      // load style
      this.style = new RootStyle(style)
      this.root.style = this.style.toString()
   }

   // clear
   clear() {
      for (const v of this.views) v.remove()
      this.views = []
   }

   // get page
   getPage() {
      return this.page
   }
}
