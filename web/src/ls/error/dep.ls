window.run = ->
  a = 1
  b = 2
  if a == 1 =>
    #throw new Error(new lderror 5566)
    e = new Error!
    lde = new lderror(5566)
    throw lde
    lderror.reject(1234) <<< "123"
