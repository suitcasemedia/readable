import _ from 'lodash';
import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux' ;
import {loadPost  , loadPostComments , deletePost , deleteComment, vote  } from '../actions';
import {Link} from 'react-router-dom'


class Post extends Component {
  componentDidMount(){
    const {id} = this.props.match.params
    this.props.loadPostComments(id);
    this.props.loadPost(id);
   
}
voteChange(contentType , id , direction, returnType){
  console.log("vote clicked")
  this.props.vote( contentType, id , direction, returnType)
}
onDeleteClick(){
    const{id} = this.props.match.params ;
    this.props.deletePost(id,() => {
         this.props.history.push('/');
    });
};
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

  renderComments(){
  
    if(this.props.comments === undefined){
      return <div>...waiting for comments</div>
    }
   // console.log("the comments are:",this.props.comments)
     
    else{
        return  _.map(this.props.comments, comment =>{
       // return this.props.comments.map(comment =>{
            return (
              <li className="posts-list__item posts-list__item--comments">
            
            <div className="post-list__item__primary">
              <p>
                {comment.body}
              </p>
            </div>
            <div className="post-list__item__secondary">
              <div class="right">
                <button className="all-margin-1 button--small">Edit comment</button>
                <button onClick={deleteComment(comment.id)} className="all-margin-1 button--small">Delete Comment</button>
              </div>
              <div className="post-list__item__votes">
                <h2 className="no-margin"> {comment.voteScore} votes + - </h2>
              </div>
              <div className="">
                Comment by: {comment.author}
              </div>
              <div className="post-list__item__date">
               {this.renderDate(new Date(comment.timestamp))}
              </div>
            </div>
          </li>
                   
                
            )
        })

    }

     
  }
  
  render() {
    console.log("post in render funtcion =" ,this.props.post)
   
     const {post , comments} = this.props;
        if(!post){
            return <div>Loading...</div>
        }
      
        return( 
          <div>
                         
            <div className="App">
              <div className="App-header">
                <div className="t-align-left" ><Link className="white" to="/">Back to post listing page</Link></div>
                <h2>  Post detail view</h2>
              </div>
              <div className="full-post">
                <div className="edit-post-button right">
                  <button className="all-margin-1"><Link to="../create-post">Create new post +</Link></button>
                  <button className="all-margin-1"><Link to={`../edit/${post.id}`}>Edit post</Link></button>
                  <button  onClick={this.onDeleteClick.bind(this)} className="all-margin-1">Delete post</button>
                  <button  onClick={()=> this.voteChange('posts', post.id , 'upVote', 'POST_UP_VOTE')} className="all-margin-1">Up vote</button>
                  <button  onClick={() => this.voteChange('posts', post.id, 'downVote', 'POST_DOWN_VOTE')} className="all-margin-1">Down vote</button>
                </div>
                <h2>  {post.title}</h2>
                <p>Category: {post.category}</p>
                <p>By: {post.author}</p>
                <p>Date: {this.renderDate(new Date(post.timestamp))}</p>
                <p>Vote score: {post.voteScore}</p>
                <p>{post.body}</p>
              </div>
            
                <button className="right"><Link to={`/create-comment/${post.id}`}>Create new comment +</Link></button>
                <div className="right"> 
                Filter comments by &nbsp;
                  <select defaultValue="Order by"  onChange="" >
                    <option  value="currentlyReading"> Highest votes</option>
                    <option value="wantToRead">Newest</option>
                    <option  value="read">Oldest</option>
                  </select> 
                      &nbsp; &nbsp; &nbsp; 
                </div>
                <h2> Comments </h2>
                <ul className="comments-list">
                  {this.renderComments() }
                 
                </ul>
              </div>
            </div>
        )}
      }

function mapStateToProps(state ,ownProps){
    // return { comments : state.comments ,post : state[ownProps.match.params.id]}
    const params = ownProps.match.params.id;
    return { comments : state.posts.comments , post:  state.posts[params]}

}
export default connect(mapStateToProps, {loadPost, loadPostComments, deletePost, deleteComment, vote})(Post)

