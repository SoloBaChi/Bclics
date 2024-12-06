import React from 'react'
import DemoCard from './Demo'

const CardContainer = ({data}) => {
  return (
   <>
   {
    data.map(item => (
    <DemoCard key={item?.id} url={item?.url} title={item?.title}/>
    ))
   }
   </>
  )
}

export default CardContainer