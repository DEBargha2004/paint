import { swapInArray } from './swapInArray'

export function addInUndoandRedo ({
  setUndoStack,
  setRedoStack,
  Index,
  action,
  source,
  destination
}) {
  if (action === 'delete') {
    setUndoStack(prev => {
      prev = prev.splice(Index, 1)
      return [...prev]
    })
    setRedoStack(prev => {
      prev = prev.splice(Index, 1)
      return [...prev]
    })
  } else if (action === 'add') {
    setUndoStack(prev => {
      prev = prev.splice(Index, 0, [null])
      return [...prev]
    })
    setRedoStack(prev => {
      prev = prev.splice(Index, 0, [null])
      return [...prev]
    })
  } else if (action === 'swap') {
    setRedoStack(prev => {
      prev = swapInArray(prev, source, destination)
      return [...prev]
    })
    setUndoStack(prev => {
      prev = swapInArray(prev, source, destination)
      return [...prev]
    })
  }
}
