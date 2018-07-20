declare var wp: any

wp.customize('blogname', (value: Function) => {
  value.bind((to: string) => {
    document.querySelectorAll('.brand').forEach((el: HTMLElement) => {
      el.textContent = to
    })
  })
})
