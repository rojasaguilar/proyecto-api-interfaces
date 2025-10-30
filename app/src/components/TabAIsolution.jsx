import React from 'react'

function TabAIsolution({aiResponse}) {
  return (
    <>
    <div>
        <p>{aiResponse||"Solicita una solución a la AI"}</p>
    </div>
    </>
  )
}

export default TabAIsolution