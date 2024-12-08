import { PropsWithChildren } from 'react'

export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <div className='text-center text-sm md:text-base lg:text-xl my-4 bg-red-600 text-white font-bold p-2 lg:p-4 rounded-xl uppercase'>
        {children}
    </div>
  )
}
