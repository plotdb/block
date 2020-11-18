
/*
set-caret-alt = ({node, x, y, range}) ->
  #mask.style.pointerEvents = "none"
  if document.caretRangeFromPoint =>
    range = document.caretRangeFromPoint x, y
  else if document.caretPositionFromPoint =>
    pos = document.caretPositionFromPoint x, y
    range = document.createRange!
    range.setStart pos.offsetNode, pos.offset
    range.collapse
  else if document.body.createTextRange
    range = document.body.createTextRange!
    range.moveToPoint x, y
    id = "temp_" + Math.random!toString(36).substring(2)
    range.pasteHTML "<span id=#{id}></span>"
    span = document.getElementById(id)
    span.getBoundingClientRect!
    # TODO
  else # TODO - manually calculate
  return range
  #select-range range
  #mask.style.pointerEvents = "auto"
*/

