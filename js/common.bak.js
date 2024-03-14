const { ref, computed, watch, createApp, onMounted, nextTick } = Vue

const zipper = {
  setup () {
    // ---------- 共用 ----------
    // 是否顯示rwd menu
    const rwdMenuVisible = ref(false)

    /*
    // ---------- 拉鍊 ----------
    const debug = ref(false)

    // 拉鍊最小與最大的Y軸位置
    const zipperHeadMinY = 80
    const zipperHeadMaxY = ref(window.innerHeight - 100)

    // 拉鍊頭中心點
    const zipperHeadX = ref(window.innerWidth / 5 * 3)
    const zipperHeadY = ref(zipperHeadMinY)

    // 拉鍊的頭尾位置
    const zipperTrackMinY = -20
    const zipperTrackMaxY = window.innerHeight - 100

    // 視窗改變大小修改中心點，改變最大拉鍊頭位置
    window.addEventListener('resize', () => {
      zipperHeadX.value = window.innerWidth / 5 * 3
      zipperHeadMaxY.value = window.innerHeight - 100
      zipperTrackMaxY.value = window.innerHeight - 100
    })

    const zipperItemW = 24
    const mouseX = ref(0)
    const mouseY = ref(0)
    const trackPathChangeTimes = ref(0)

    // 最外層容器
    const zipperWrapper = ref()

    // svg element
    const leftTrack = ref()
    const rightTrack = ref()

    const leftTrackPath = computed(() => {
      const baseX = zipperHeadX.value - 26
      return `M${baseX - zipperHeadY.value},${zipperTrackMinY}Q${baseX},${zipperHeadY.value / 2},${baseX},${zipperHeadY.value}L${baseX},${zipperTrackMaxY}`
    })

    const rightTrackPath = computed(() => {
      const baseX = zipperHeadX.value + 26
      return `M${baseX + zipperHeadY.value},${zipperTrackMinY}Q${baseX},${zipperHeadY.value / 2},${baseX},${zipperHeadY.value}L${baseX},${zipperTrackMaxY}`
    })

    function getPointTransform (path, length) {
      const p1 = path.getPointAtLength(length)
      const p2 = path.getPointAtLength(length + 3)
      const r = Math.atan2(p1.y - p2.y, p1.x - p2.x) * (180 / Math.PI) - 90

      return {
        x: p1.x,
        y: p1.y,
        r
      }
    }

    watch(leftTrackPath, () => {
      nextTick(() => {
        trackPathChangeTimes.value++
      })
    })

    const leftTrackItems = computed(() => {
      const result = []
      // 這個不要刪，因為要吃trackPathChangeTimes的reactive來更新這個變數
      trackPathChangeTimes.value

      const path = leftTrack.value

      if (path) {
        const totalLength = path.getTotalLength()
        const max = totalLength / zipperItemW - 1

        for (let i = 0; i < max; i++) {
          const item = getPointTransform(path, totalLength - i * zipperItemW - 20)
          result.push(item)
        }
      }

      return result
    })

    const rightTrackItems = computed(() => {
      const result = []
      // 這個不要刪，因為要吃trackPathChangeTimes的reactive來更新這個變數
      trackPathChangeTimes.value

      const path = rightTrack.value

      if (path) {
        const totalLength = path.getTotalLength()
        const max = totalLength / zipperItemW - 1

        for (let i = 0; i < max; i++) {
          const item = getPointTransform(path, totalLength - i * zipperItemW - 6)
          result.push(item)
        }
      }

      return result
    })

    const near = computed(() => {
      const x1 = mouseX.value
      const y1 = mouseY.value
      const x2 = zipperHeadX.value
      const y2 = zipperHeadY.value
      const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
      return distance < 100 && y1 > y2
    })

    const zipperHeadRot = computed(() => {
      if (near.value) {
        const x1 = mouseX.value
        const y1 = mouseY.value
        const x2 = zipperHeadX.value
        const y2 = zipperHeadY.value

        // 計算兩點的差異
        const deltaX = x2 - x1
        const deltaY = y2 - y1

        // 使用 Math.atan2 計算反正切值，並將結果轉換為角度
        var angleInRadians = Math.atan2(deltaY, deltaX)
        var angleInDegrees = angleInRadians * (180 / Math.PI)

        return angleInDegrees + 90
      } else {
        return 0
      }
    })

    function updateZipperHeadPos (event) {
      const zipperWrapperTop = zipperWrapper.value.getBoundingClientRect().top + document.scrollingElement.scrollTop
      let pos = event.clientY - zipperWrapperTop - 20

      if (pos < zipperHeadMinY) {
        pos = zipperHeadMinY
      } else if (pos > zipperHeadMaxY.value) {
        pos = zipperHeadMaxY.value
      }

      zipperHeadY.value = pos
    }

    document.addEventListener('mousemove', (event) => {
      const zipperWrapperTop = zipperWrapper.value.getBoundingClientRect().top + document.scrollingElement.scrollTop
      mouseX.value = event.clientX
      mouseY.value = event.clientY - zipperWrapperTop
    })

    function mousedown () {
      document.addEventListener('mousemove', updateZipperHeadPos)
      document.addEventListener('mouseup', mouseup)
    }
    function mouseup () {
      document.removeEventListener('mousemove', updateZipperHeadPos)
      document.addEventListener('mouseup', mouseup)
    }
    */

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

      // debug,
      // zipperWrapper,
      // leftTrack,
      // leftTrackPath,
      // leftTrackItems,
      // rightTrack,
      // rightTrackPath,
      // rightTrackItems,
      // zipperTrackMaxY,
      // zipperHeadY,
      // zipperHeadX,
      // zipperHeadRot,
      // mouseX,
      // mouseY,
      // mousedown,
      // near
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(zipper)
  app.mount('._index')
})
