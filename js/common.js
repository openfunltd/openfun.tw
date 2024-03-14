const { ref, computed, watch, createApp, onMounted, nextTick } = Vue

const zipper = {
  setup () {
    // ---------- 共用 ----------
    // 是否顯示rwd menu
    const rwdMenuVisible = ref(false)

    const headerLightBg = ref(false)
    const bgPos = ref(0)
    document.addEventListener('scroll', (event) => {
      headerLightBg.value = document.scrollingElement.scrollTop > 100
      bgPos.value = document.scrollingElement.scrollTop / 5
    })

    return {
      rwdMenuVisible,
      headerLightBg,
      bgPos
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(zipper)
  app.mount('._index')
})
