import React, {Component} from 'react'
import {Field} from 'redux-form'
import { reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {edit, loadPost , changeField} from '../actions'

class Edit extends Component {

componentDidMount(){
    const {id} = this.props.match.params
    this.props.loadPost(id);
    
    
}
  renderField(field ){
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

onSubmit(values/*id , contentType , values , returnType */){
  /*
   this.props.edit(values, () =>{
        this.props.history.push('/')
   });
}
*/
        this.props.edit(this.props.id, values,"posts", "EDIT_POST" ,() =>{
        this.props.history.push('/')
    });
}
render(){
  
    const { handleSubmit, load, pristine, reset, submitting ,error } = this.props
          return(
            <div>
              <div className="App">
                <div className="App-header">
                  <div className="t-align-left" ><Link className="white" to="/">Back to post listing page</Link></div>
                  <h2>  Edit  </h2>
                </div>
                <form onSubmit={handleSubmit( this.onSubmit.bind(this))}>
                  <Field
                      label="Title"
                      name="title"
                      component={this.renderField} 
                  />
                  <Field
                      editmode={true}
                      label="Post Content"
                      name="body"
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

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
Edit = reduxForm({
    validate,
    form: 'editForm' // a unique identifier for this form
  })(Edit)
  
  // You have to connect() to any reducers that you wish to connect to yourself
  Edit = connect(
    (state,ownProps) => {
     const params = ownProps.match.params.id; 
     return{
        initialValues: state.posts[params] , id: params  // pull initial values from posts reducer

     } 
    },
    { loadPost, edit , changeField } // bind post    loading action creator
  )(Edit)
  
  export default Edit



