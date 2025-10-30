import React from 'react'

function TabSolution({solution}) {
  return (
    <>
    <div>
        <p>
            {solution || "Solución aún no disponible"}
        </p>
    </div>
    </>
  )
}

export default TabSolution