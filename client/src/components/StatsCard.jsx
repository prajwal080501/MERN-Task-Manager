import React from 'react'

const StatsCard = ({ todosCount }) => {
  return (
    <div
      className='bg-blue-500 text-xl w-full font-medium text-white w-1/2 h-1/2 p-3 rounded-lg'
    > <span className='text-3xl font-bold'>{todosCount}</span> tasks</div>
  )
}

export default StatsCard