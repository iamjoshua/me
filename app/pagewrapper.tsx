"use client"
import { AnimatePresence, motion } from "framer-motion"
import React, {
  cloneElement,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { usePathname } from "next/navigation"

let pageContent = <>base</>

function recursiveCloneChildren(children: React.ReactElement[], newProps: any) {
  return React.Children.map(children, (child: React.ReactElement) => {
    if (!React.isValidElement(child)) {
      return child
    }

    // Eg. String has no props
    // if (child.props) {
    //   // @ts-ignore
    //   childProps.children = recursiveCloneChildren(child.props.children, newProps);
    //   return React.cloneElement(child, newProps);
    // }
    return child
  })
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [lastPath, setLastPath] = useState(pathname)
  const [child, setChild] = useState<ReactNode>(children)
  // const child = useRef<ReactNode>()

  const setContent = () => {
    console.log("setting content")
    // child.current = cloneElement(children as React.ReactElement)
    // setChild(cloneElement(children as React.ReactElement))
    // setChild(recursiveCloneChildren(children as React.ReactElement[], { disabled: true }) )
    // pageContent = recursiveCloneChildren(children as React.ReactElement[], {
    //   disabled: true,
    // })
    // console.log(pageContent)

    setChild(children)
  }

  useEffect(() => {
    setChild(<>changing</>)
    setTimeout(() => {
      if (pathname != lastPath) setLastPath(pathname)
    }, 300)
  }, [pathname])

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        console.log("exit complete")
        setTimeout(() => {
          setContent()
        }, 300)
      }}
    >
      {pathname === lastPath && (
        <motion.div
          key={lastPath}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 2 }}
        >
          {pathname === lastPath ? child : <>cool</>} 
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageWrapper
