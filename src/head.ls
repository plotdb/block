rescope = if window? => window.rescope else if module? and require? => require "@plotdb/rescope" else null
csscope = if window? => window.csscope else if module? and require? => require "@plotdb/csscope" else null
proxise = if window? => window.proxise else if module? and require? => require "proxise" else null
semver = if window? => window.proxise else if module? and require? => require "@plotdb/semver" else null
fetch = if window? => window.fetch else if module? and require? => require "node-fetch" else null
require! <[fs]>
