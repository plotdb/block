module.exports =
  pkg:
    dependencies: [
      {name: "ldcolor"},
      {name: "@loadingio/ldcolorpicker"}
    ]
  init: ({ctx}) ->
    console.log ctx.ldcolor
