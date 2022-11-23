block.env if self? => self else globalThis
if module? => module.exports = block
else if window? => window.block = block
