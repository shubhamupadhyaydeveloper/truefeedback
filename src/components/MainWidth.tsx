import { cn } from '@/lib/utils'
import React from 'react'

type Tprops = {
    classname? : String,
    children : React.ReactNode
}

const MaxWidthWrapper = ({classname,children}:Tprops) => {
  return (
    <div className={cn('h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20',classname)}>
        {
            children
        }
    </div>
  )
}

export default MaxWidthWrapper;