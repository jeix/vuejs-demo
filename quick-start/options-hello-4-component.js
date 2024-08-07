export default {
  data() {
    return { count: 0 }
  },
  template: /*html*/`<div>count is {{ count }} <button @click="count++">up</button></div>`
}