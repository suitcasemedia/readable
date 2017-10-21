import React, {Component} from 'react'
import {Field} from 'redux-form'
import { reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createComment} from '../actions'

class CreateComment extends Component {


  renderField(field){
    const {meta : {touched , error}} = field;
    
    const className = `form-group ${touched && error ? 'has-danger': ''}` ;
    return( 
       <div className="form-group has-danger">
            <label>{field.label}</label>
            <input
                className={className}
                type="text"
                {...field.input}
            >
            </input>
            <div className="text-help">
                { touched ? error : ''}
            </div>
        </div>
   )       
}


onSubmit(values){
  
   this.props.createComment(this.props.id, values,() =>{
        this.props.history.push(`/post/${this.props.id}`)
   });
}
render(){
          const {handleSubmit} = this.props;
  
          return(
            <div>
            
              <div className="App">
                <div className="App-header">
                  <div className="t-align-left" ><Link className="white back" to={`/post/${this.props.id}`}>Back to post</Link></div>
                  <h2>  Create new Comment</h2>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                 
                  <Field
                      label="Comment Content"
                      name="body"
                      component={this.renderField}/>
                  <Field
                      label="Author"
                      name="author"
                      component={this.renderField}
  
                  />
                 
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button style={{marginLeft:'10px'}} ><Link to="/" className="btn btn-danger" >Cancel</Link></button>
                </form> 
              </div>
            </div>       
          );
      }
  }
  
function validate(values) {
  const errors = {}

 
  if(!values.body){
      errors.body = "Enter some content please"

  }

  if(!values.owner){
    errors.owner = "Enter some content please"

}

return errors;
  
}

function  mapStateToProps(state,ownProps){
    const params = ownProps.match.params.id; 
   
    
      return{ id: params}
  
  }
export default reduxForm({
  validate,
  form:'CommentsNewForm'
})(
 connect(mapStateToProps,{createComment})(CreateComment)
);

