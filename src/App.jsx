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
  const [itemsTemp, setItemsTemp] = useState([])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  const itemsData = items.join(',')
  const itemsTempData = itemsTemp.join(',')

  function Items() {
    if (itemsTemp.length === 0) {
      return items.map((id) => <SortableItem key={id} id={id} />)
    } else {
      return itemsTemp.map((id) => <SortableItem key={id} id={id} />)
    }
  }

  function Blank() {
    if (itemsTemp.length === 0) {
      return null
    } else {
      return <div className="min-h-7"></div>
    }
  }

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

  function handleDragEnd(event) {
    const { active, over } = event
    if (over.id === 'trash') {
      setItems((items) => items.filter((item) => item !== active.id))
      setItemsTemp([])
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

  function handleDragOver(event) {
    if (event.over.id === 'trash') {
      const newItemsTemp = items.filter((item) => item !== event.active.id)
      setItemsTemp(newItemsTemp)
    } else {
      if (itemsTemp.length === 0) {
        return
      }
      setItemsTemp([])
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div>{'itemsData: ' + itemsData}</div>
      <div>{'itemsTempData: ' + itemsTempData}</div>
      <div className="max-w-sm p-3 border border-black">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Items />
          <Blank />
        </SortableContext>
      </div>
      <TrashDroppable id="trash">Trash</TrashDroppable>
    </DndContext>
  )
}
