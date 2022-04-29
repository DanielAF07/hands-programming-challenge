/*
  👉 : moves the memory pointer to the next cell
  👈 : moves the memory pointer to the previous cell
  👆 : increment the memory cell at the current position
  👇 : decreases the memory cell at the current position.
  🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
  🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
  👊 : Display the current character represented by the ASCII code defined by the current position.
*/

const MAX_CELL = 255
const MIN_CELL = 0

const clamp = (value) => {
  if (value > MAX_CELL) {
    return MIN_CELL
  } else if (value < MIN_CELL) {
    return MAX_CELL
  }
  return value
}

const translate = (string) => {
  const memory = [0]
  let pointer = 0
  let output = ''
  const actions = Array.from(string)
  let index = 0

  // Find Loops and indexes
  const loops = []
  const loopsData = {}
  actions.forEach((action, index) => {
    if (action === '🤜') {
      loops.push(index)
    } else if (action === '🤛') {
      const openIndex = loops.pop()
      loopsData[parseInt(openIndex)] = index
    }
  })

  // Translate
  while (index < actions.length) {
    const action = actions[index]
    switch (action) {
      case '👉':
        pointer++
        memory[pointer] ??= 0
        break
      case '👈':
        pointer--
        memory[pointer] ??= 0
        break
      case '👆':
        memory[pointer] = clamp(memory[pointer] + 1)
        break
      case '👇':
        memory[pointer] = clamp(memory[pointer] - 1)
        break
      case '🤜':
        if (memory[pointer] === 0) {
          index = loopsData[index]
        }
        break
      case '🤛':
        if (memory[pointer] !== 0) {
          const desiredIndex = Object.values(loopsData).findIndex((value) => value === index)
          index = Object.keys(loopsData)[desiredIndex]
        }
        break
      case '👊':
        output += String.fromCharCode(memory[pointer])
        break
    }
    index++
    // console.log({ action, index, pointer, value: memory[pointer], output })
  }
  return output
}

console.log(translate('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊'))
console.log(translate('👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊'))

module.exports = translate