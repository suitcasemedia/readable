import _ from 'lodash';
import {
    LOAD_POSTS,
    LOAD_POST,
    CREATE_POST,
    DELETE_POST,
    CREATE_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    LOAD_POST_COMMENTS
    
} from '../actions' ;

const initialPostsState = {}
export default function (state= initialPostsState , action){
    switch (action.type){
        case LOAD_POSTS:
            return _.mapKeys(action.payload.data,'id')
        case LOAD_POST:
            if( action.payload.data){
                return { ...state, [action.payload.data.id]: action.payload.data } 
            }
        case DELETE_COMMENT:
            return _.omit(state.comments, action.payload);

        case LOAD_POST_COMMENTS:
            if(action.payload.data){
                console.log("comments in the reducer" , action.payload)
                const comments = _.mapKeys(action.payload.data,'id')
                return {...state, comments}
            }
        case CREATE_COMMENT:
            
            return{...state}
            
    
           
         default:
            return state
    }

}

