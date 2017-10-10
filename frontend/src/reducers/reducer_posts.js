import _ from 'lodash';
import {
    LOAD_POSTS,
    LOAD_POST,
    CREATE_POST,
    DELETE_POST,
    CREATE_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    LOAD_POST_COMMENTS,
    CHANGE_FIELD
    
} from '../actions' ;

const initialPostsState = {}
export default function (state= initialPostsState , action){
    switch (action.type){
        case LOAD_POSTS:
            return _.mapKeys(action.payload.data,'id')
        case LOAD_POST:
            if( action.payload.data){
                return { ...state, [action.payload.data.id]: action.payload.data} 
            }

        case LOAD_POST_COMMENTS:
            if(action.payload.data){
                return {...state, comments: action.payload.data}
            }
        case CHANGE_FIELD:
            return {...state , [action.id.field]: action.text}
       
           
         default:
            return state
    }

}

