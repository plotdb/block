window.addEventListener \error, (evt) ->
  if evt.error and evt.error.name == \lderror and evt.error.error and evt.error != evt.error.error =>
    console.warn "uncaught lderror", evt.error
    console.warn "with its internal Error object thrown:"
    evt.preventDefault!
    # add a setTimeout so it will be handled again by this handler
    setTimeout (-> throw evt.error.error), 0

window.addEventListener \unhandledrejection, (evt)->
  if evt.reason and evt.reason.name == \lderror and evt.reason.error =>
    console.warn "Unhandled rejection with lderror:", evt.reason
    console.warn "with its internal Error object thrown:"
    throw evt.reason.error
    evt.preventDefault!

manager = new block.manager registry: ({ns, name, version, path, type}) ->
  if type == \block => return "/error/block.html"
  return "/js/error/dep.js"
manager.from {name: "error"}, {root: document.body}
  .then (o) ->

setTimeout (-> throw lderror(1314)), 0

func = new Function("console.log('try to throw an Error in `new Function`');throw new Error()")
func!

