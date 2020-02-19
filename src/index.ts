/** @format */
export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

interface stackItem {
  line: number
  column: number
  filename: string
}

export function parseError(err: Error): ErrorMessage {
  if (!err || !err.stack) throw new Error('error not stack')
  const errorList: Array<string> = err.stack.split('\n')
  const message = errorList.shift() || ''
  const stack = errorList.map(item => parseItem(item)).filter((x): x is stackItem => x !== null)
  return {message, stack}
}

function parseItem(item: string): stackItem | null {
  let trimItem = item.trim()
  if (!isIncludeHttp(trimItem)) return null
  if (trimItem.startsWith('at')) {
    trimItem = trimItem.split(' ').pop() || ''
  } else {
    trimItem = trimItem.split('@')[1] || trimItem
  }
  return parseBlock(trimItem)
}

function parseBlock(block: string): stackItem {
  const elements = block.split(':')
  const line = parseInt(elements[elements.length - 2])
  const column = parseInt(elements[elements.length - 1])
  const filename = [elements[0], elements[1], elements[2]].join(':')
  return {line, column, filename}
}

const isIncludeHttp = (str: string): boolean => str.includes('http')
