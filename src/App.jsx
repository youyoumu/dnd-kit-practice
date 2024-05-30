import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { SortableItem } from './SortableItem'

export default function App() {
  const [items, setItems] = useState([1, 2, 3])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function TrashDroppable(props) {
    const { isOver, setNodeRef } = useDroppable({
      id: props.id
    })
    const style = {
      backgroundColor: isOver ? 'red' : undefined
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="border border-black w-64 h-20"
      >
        {props.children}
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-sm p-3 border border-black">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </div>
      <TrashDroppable id="trash">Trash</TrashDroppable>
    </DndContext>
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (over.id === 'trash') {
      setItems((items) => items.filter((item) => item !== active.id))
      return
    }

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
}
