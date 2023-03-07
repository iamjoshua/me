"use client"

import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  MouseEventHandler,
} from "react"
// @ts-ignore
import anime from "animejs/lib/anime.es.js"
import { useResizeDetector } from "react-resize-detector"

function TheGrid() {
  const [grid, setGrid] = useState({ columns: 0, rows: 0, total: 0 })

  const getGridSize = () => {
    if (!ref.current) return
    const itemSize = 50 // update global.css too
    const columns = Math.floor(ref.current.clientWidth / itemSize)
    const rows = Math.floor(ref.current.clientHeight / itemSize)
    setGrid({ columns, rows, total: rows * columns })
    setTimeout(() => {
      anime({
        targets: ".grid-item",
        backgroundColor: "rgb(255, 255, 255, 0)",
        duration: 0,
      })
    }, 100)
  }

  const handleStagger = (index: number) => {
    anime({
      targets: ".grid-item",
      keyframes: [
        { background: "rgb(3, 105, 161, 0.2)" },
        { background: "rgb(255, 255, 255, 0)" },
      ],
      easing: "easeInOutQuad",
      duration: 1000,
      delay: anime.stagger(30, {
        grid: [grid.columns, grid.rows],
        from: index,
      }),
    })
  }

  const { ref } = useResizeDetector({
    refreshMode: "debounce",
    refreshRate: 1000,
    onResize: getGridSize,
  })

  useEffect(() => {
    setTimeout(() => grid.total && handleStagger(grid.columns / 2), 2000)
  }, [grid])

  return (
    <div ref={ref} id="grid" className="absolute z-0 w-full h-full">
      {[...Array(grid.total)].map((x, i) => (
        <div key={i} className="grid-item" onClick={() => handleStagger(i)} />
      ))}
    </div>
  )
}

export default TheGrid
