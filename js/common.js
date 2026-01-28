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

    const workListType = ref('product')

    return {
      rwdMenuVisible,
      headerLightBg,
      bgPos,
      workListType,
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(zipper)
  app.mount('._index')
})

const currentYear = document.getElementById('current-year');
if (currentYear) {
  currentYear.innerText = new Date().getFullYear();
}

$(document).ready(function(){
  $('.award-photos').owlCarousel({
    margin: 10,
    loop: true,
    autoWidth: false,
    items: 1,
    responsive: {
      767: {
        autoWidth: true,
        items: 0,
      }
    }
  });
});