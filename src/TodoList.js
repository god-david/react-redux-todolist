import React, { Component } from 'react';
import { List, Input, Button } from 'antd';
import store from './store'
import axios from 'axios'
import {getInputChangeAction, getDeleteItemAction, getAddItemAction, getInitAction} from './store/actionCreators'

import 'antd/dist/antd.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = store.getState()
    store.subscribe(this.handleStoreChange)
    // 只要store里面的内容改变，subscribe里面有一个函数就会自动执行
    // store 一旦接收到新的newState数据，就会把当前store数据替换成reducer返回的数据
    // 一旦store中数据发生变化，handleStoreChange这个方法就会被执行，这时候就会去store中重新取一次数据，去替换掉当前组件里的数据
  }
  handleInputChange = (e) => {
    const value = e.target.value
    const action = getInputChangeAction(value)
    store.dispatch(action)
    
    this.setState(() => ({
      inputValueJudge: value
    }))
  }

  handleStoreChange = () => {
    // console.log("store change")
    this.setState(store.getState())
  }

  handleBtnClick = () => {
    // console.log("inputValueJudge: ",this.state.inputValueJudge)
    if (this.state.inputValueJudge == undefined) {
      alert('填写值不能为空')
      return
    }
    const action = getAddItemAction()
    store.dispatch(action)
  }

  handleDeleteClick = (index) => {
    // console.log(index)
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }

  // componentDidMount() {
  //   axios.get('/list.json').then((res) => {
  //     const data = res.data
  //     console.log(data)
  //     const action = getInitAction(data)
  //     store.dispatch(action)
  //   })
  // }

  render() {
    // console.log('--render---',this.state.inputValueJudge)
    const style={
      width: "250px",
      marginLeft: "15px",
      marginRight: "15px"
    }
    return (
      <TodoListUI
        style={style}
        inputValue={this.state.inputValue}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        list={this.state.list}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
  }
}

const TodoListUI = ({style, inputValue, handleInputChange, handleBtnClick, list, handleDeleteClick}) => {
  return (
    <div style={{marginTop: "20px"}}> 
      <div>
        <Input 
          value={inputValue} 
          placeholder="Basic usage" 
          style={style} 
          onChange={handleInputChange}
        />
        <Button type="primary" onClick={handleBtnClick}>提交</Button>
      </div>
      <List
        style={{marginLeft: "15px", marginTop: "20px",width: "250px"}}
        bordered
        dataSource={list}
        renderItem={
          (item, index) => (
            <List.Item onClick={() => handleDeleteClick(index)}>
              {item}
            </List.Item>
          )}
      />
    </div>
  )
}