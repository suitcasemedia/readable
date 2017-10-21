import axios from 'axios';
import {v4 } from 'node-uuid';
export const LOAD_POSTS =  'LOAD_POSTS';
export const LOAD_POST  = 'LOAD_POST' ;
export const CREATE_POST = 'CREATE_POST' ;
export const EDIT_POST = 'EDIT_POST' ;
export const DELETE_POST = 'DELETE_POST' ;
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT' ;
export const CHANGE_FIELD = 'CHANGE_FIELD' ;
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LOAD_POST_COMMENTS = 'LOAD_POST_COMMENTS';
export const UP_VOTE_POST = 'UP_VOTE_POST' ;
export const POPULATE_FORM = 'POPULATE_FORM' ;
export const SET_FORM_STATE = 'SET_FORM_STATE'
const ROOT_URL = 'http://localhost:5001'
const API_KEY = '?authorization=hello'

const headers = {
    'Accept': 'application/json' 
  }

export function loadPosts(){
const request = axios.get(
    `${ROOT_URL}/posts`,
    {headers: {'authorization': 'hello'}})
    return{   
        type:  LOAD_POSTS,
        payload: request
    }
}
export function loadPostComments(id){
    const request = axios.get(
        `${ROOT_URL}/posts/${id}/comments`,
        {headers: {'authorization': 'hello'}})
        return{      
            type: LOAD_POST_COMMENTS,
            payload: request
        }
    }
export function loadPost(id){
    const request = axios.get(
        `${ROOT_URL}/posts/${id}`,
        {headers: {'authorization': 'hello'}})

    return{
        type : LOAD_POST,
        payload: request
    }
}


export function createPost(values ,callback){
    console.log("creating posts")
    values.id= v4();
    values.timestamp = Date.now();
    values.voteScore = 0;
  //  values.category = "redux";
  //  values.author = "jimmy";
   
    const request  = axios.post(`${ROOT_URL}/posts/`,values,
    {headers: {'Authorization': 'hello'}})
        .then(()=> callback());
    return{
        type: CREATE_POST,
        payload: request      
    }
}


export function vote(contentType , id , direction , returnType){
    console.log("voting")
    const request = axios.post(`${ROOT_URL}/${contentType}/${id}`,
    {option: `${direction}`},
    { headers: { 'Authorization': 'hello' }}
    )

    
    return{   
        type:   returnType
      //  payload: id
    }
}

export function edit( id ,values,   contentType, returnType ,  callback  ){
    console.log("edit triggered")
   
    // const returnType = "EDIT_POST";
    const request = axios.put(`${ROOT_URL}/${contentType}/${id}`,
    {title: values.title , body: values.body} , 
    
    {headers: {Authorization : "hello"}}
    ) 
    .then(()=>callback()); 
    
    return{
        type: returnType,
        
       // payload:  {...recipe, starredByJoe : newStarredValue }  
    }
}
export function changeField(id ,field, text){
     

}
export function deletePost(id, callback){
    const request = axios.delete(
        `${ROOT_URL}/posts/${id}`,
        {headers: {'authorization': 'hello'}})
    .then(()=> callback());
    return{
        type : DELETE_POST,
        payload: id
    }
}

export function createComment(parentId,values ,callback){
    values.id= v4();
    values.timestamp = Date.now();
    //values.voteScore = 0;
    values.owner = "values.owner;"
    values.parentId = parentId;

   console.log("Creating comment")
    const request  = axios.post(`${ROOT_URL}/comments/`,values,
    {headers: {'Authorization': 'hello'}})
        .then(()=> callback());
    return{
        type: CREATE_COMMENT,
        payload: request      
    }  
}

export function deleteComment(id){
    const request = axios.delete(
        `${ROOT_URL}/comments/${id}`,
        {headers: {'authorization': 'hello'}})
    
    return{
        type : DELETE_COMMENT,
        payload: id
    }
}

export function returnFilterChange(parsedData){
    
      return{
          type: CREATE_COMMENT ,
          payload : parsedData
      }
  
  }

  export function populateForm(post){
      return{

         type: POPULATE_FORM,
         payload: post
      }
  }
  export function setFormState(post ){

    return {


        type: SET_FORM_STATE,
        payload : post

    }


  }