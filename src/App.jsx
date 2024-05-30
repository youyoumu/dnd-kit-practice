import { DndContext } from '@dnd-kit/core'

import { Draggable } from './Draggable'
import { Droppable } from './Droppable'

export default function App() {
  return (
    <DndContext>
      <Draggable />
      <Droppable />
    </DndContext>
  )
}
