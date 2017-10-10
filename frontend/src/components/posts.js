import _ from 'lodash';
import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {loadPosts} from '../actions/';
import {returnLoadPosts} from '../actions/';


class Posts extends Component {


  componentDidMount(){
  this.props.loadPosts()
  
}

renderPosts(){
 
return  _.map(this.props.posts, post =>{
   if(post.deleted === false){
    return (
      <li className="posts-list__item" key={post.id}>
         <div className="post-list__item__primary">
             
            <Link to={`/post/${post.id}`}>{<h2 className="no-margin">{post.title}</h2>}</Link>
            <p>{post.body}
            </p>
             
            </div>
            <div className="post-list__item__secondary">
            <div className="post-list__item__votes">
                <h2 className="no-margin"> {post.voteScore} votes + - </h2>
              </div>
              <div className="post-list__item__no-of-comments">
                2 comments 
              </div>
              
              <div className="post-list__item__author">
                By: <strong>{post.author}</strong>
                </div>
                <div className="post-list__item__date">
                  {this.renderDate(new Date(post.timestamp))}
                </div>
            </div>
            
            
         
          
          </li>

         
    )



   }
    
})
}

renderDate(date){
  
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  




  render() {
    console.log(" maybe ? posts =", this.props.posts)
    
    return (
      <div className="App">
        <div className="App-header">
          
          <h2>Welcome to Readable</h2>
          <div className=""> 
            Filter by &nbsp;
            <select defaultValue="Order by"  >
                      <option  value="currentlyReading"> Highest votes</option>
                      <option value="wantToRead">Newest</option>
                      <option  value="read">Oldest</option>
                      
            </select>  
          </div>

          <div className="add-new">
            <h2><Link to="create-post">Create new post +</Link></h2>
          
          </div>
          
        </div>
       
        <ul className="categories">

          
          <h2> Categories</h2>
          <li className="categories__item categories__item--active"> Show all </li>
          <li className="categories__item"> React </li>
          <li className="categories__item"> Redux </li>
        
          <li className="categories__item"> Udacity </li>
        
        
        </ul>
        <ul className="posts-list">
        {this.renderPosts()}
         
           
         
          
          <li>

          </li>

        </ul>
      </div>
    );
  }
}

function  mapStateToProps(state){
  console.log("state = ", state)
  
    return{ posts: state.posts }

  
  
}
export default connect(mapStateToProps, {loadPosts})(Posts) ;