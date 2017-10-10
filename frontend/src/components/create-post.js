import React, {Component} from 'react'
import {Field} from 'redux-form'
import { reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createPost} from '../actions'

class CreatePost extends Component {


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
  
   this.props.createPost(values, () =>{
        this.props.history.push('/')
   });
}
render(){
  
          const {handleSubmit} = this.props;
  
          return(
            <div>
            
              <div className="App">
                <div className="App-header">
                  <div className="t-align-left" ><Link className="white back" to="/">Back to post listing page</Link></div>
                  <h2>  Create new post</h2>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field
                      label="Title"
                      name="title"
                      component={this.renderField}
                  />
                   <Field
                       label="Categories"
                      name="category"
                      component={this.renderField}
                  />
                  <Field
                      label="Post Content"
                      name="body"
                      component={this.renderField}
  
                  />
                  <Field
                      label="Author"
                      name="owner"
                      component={this.renderField}
  
                  />
                 
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <Link to="/" className="btn btn-danger" >Cancel</Link>
                </form> 
              </div>
            </div>       
          );
      }
  }
  
function validate(values) {
  const errors = {}

  //   valitate the inputs from 'values'
  if(!values.title || values.title.length < 3){
      errors.title = "Enter a title that is at least 3 characters long"

  }
  if(!values.category){
      errors.categories = "Enter a Category"

  }
  if(!values.body){
      errors.body = "Enter some content please"

  }

return errors;
  
}


export default reduxForm({
  validate,
  form:'PostsNewForm'
})(
 connect(null,{createPost})(CreatePost)
);

