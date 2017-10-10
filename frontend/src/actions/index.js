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

export function edit( /* id , contentType, , values , returnType , */ callback  ){
    console.log("edit triggered")
    let id = "8xf0y6ziyjabvozdd253nd" ;
    let values = {};
    values.title = 'new title4';
    values.body = 'new body4' ;
    // const returnType = "EDIT_POST";
    const request = axios.put(`${ROOT_URL}/posts/${id}`,
    {title: values.title , body: values.body} , 
    
    {headers: {Authorization : "hello"}}
    ) 
    .then(()=>callback()); 
    
    return{
        type: "EDIT_POST"//returnType,
        
       // payload:  {...recipe, starredByJoe : newStarredValue }  
    }
}
export function changeField(id ,field, text){
     
    const fieldChanged = id.field
    return{

        type: CHANGE_FIELD,
        id ,
        field,
        text
       
        
    }

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






export function createComment(starredOnly, query, cookingTime, callback){
    const request = axios({
        method: 'post',
        url: '/filter/',
        data: {
          starredOnly,
          query,
          cookingTime,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          }
        }
    }).then(function(response) {
        return response.data;
        })
    .then((parsedData)=> {
        // data here
        
        callback(parsedData)   

    }) 
    
}

export function returnFilterChange(parsedData){
    
      return{
          type: CREATE_COMMENT ,
          payload : parsedData
      }
  
  }