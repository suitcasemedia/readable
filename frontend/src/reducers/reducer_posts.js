import _ from 'lodash';
import {
    LOAD_POSTS,
    LOAD_POST,
    CREATE_POST,
    DELETE_POST,
    
} from '../actions' ;

const initialPostsState = {}
export default function (state= initialPostsState , action){
    switch (action.type){
        case LOAD_POSTS:
            if (action.payload){
                return _.mapKeys(action.payload.data,'id')
            }
            
           
        case LOAD_POST:
            if( action.payload.data){
                return { ...state, ...state.comments, [action.payload.data.id]: action.payload.data } 
            }
         default:
            return state
    }

}

