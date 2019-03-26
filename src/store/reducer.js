import {CHNAGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}

// reducer可以接受state, 但是绝不能修改state
export default (state = defaultState, action) => {
  // state 指的是store里面上次存储的数据，action指的是用户传过来的那句话
  // console.log(state, action)
  if (action.type === CHNAGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }

  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    // splice 找到当前的索引，删除一个元素
    return newState
  }

  return state
}

// reducers 的作用： 接受之前的数据和也拿到了action说的这句话。他要结合之前的数据和当前用户需要执行的操作。这个时候，store里面的值就被替换了