import { useDroppable } from '@dnd-kit/core'

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })
  const style = {
    color: isOver ? 'green' : undefined
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-black w-64 h-64"
    >
      {props.children}
    </div>
  )
}
