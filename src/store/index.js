import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import serverAxios from '../server/request';
import clientAxios from '../client/request';
import { reducer as homeReducer } from '../containers/Home/store';
import { reducer as headerReducer } from '../components/Header/store';

const reducer = combineReducers({
  home: homeReducer,
  header: headerReducer
});

// 用户的store需要独享，不能共享，类似vue组件的data
export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
};

export const getClientStore = () => {
  // 数据的脱水
  const defaultState = window.context.state;
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
};