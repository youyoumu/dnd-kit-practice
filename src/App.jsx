import { useState } from 'react'
import { DndContext } from '@dnd-kit/core'

import { Droppable } from './Droppable'
import { Draggable } from './Draggable'

export default function App() {
  const [isDropped, setIsDropped] = useState(false)
  const draggableMarkup = <Draggable>Drag me</Draggable>

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>{isDropped ? draggableMarkup : 'Drop here'}</Droppable>
    </DndContext>
  )

  function handleDragEnd(event) {
    console.log(event)
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true)
    }
  }
}
