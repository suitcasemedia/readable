import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './font-awesome/css/font-awesome.min.css'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route ,Switch} from 'react-router-dom'
import promise from 'redux-promise' ;
import reducer from './reducers' ;
import registerServiceWorker from './registerServiceWorker';
import Posts from './components/posts';
import Post from './components/post';
import CreateComment from './components/create-comment'
import CreatePost from './components/create-post';
import Edit from './components/edit'
//const store = createStore(reducer)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(promise))(createStore);



ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducer)}>
      <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/create-post" component={CreatePost} />
          <Route exact path="/create-comment/:id" component={CreateComment} />
          <Route exact path="/" component={Posts} />



        
          
        </Switch>
      </div>

    </BrowserRouter>
    
    </Provider>
    , document.getElementById('root')


);


registerServiceWorker();
