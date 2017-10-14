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
    const post = this.props.post;
    console.log("props = ", this.props)
    
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
                value={field.initialValue ||''}
              
               
               
            >
            </input>
            <div className="text-help">
                { touched ? error : ''}
            </div>
        </div>
   )       
}


onSubmit(/*id , contentType , values , returnType */){
  /*
   this.props.edit(values, () =>{
        this.props.history.push('/')
   });
}
*/
        this.props.edit(/*id ,"POST" ,values returnType ,*/() =>{
        this.props.history.push('/')
    });
}



render(){
  
          const {handleSubmit} = this.props;
          if (this.props.post) {
              let {post} =this.props;
              let {title, body} = post
          }
          else{
              let post = ''
              let title = ''
          }
         
          return(
            <div>
            
              <div className="App">
                <div className="App-header">
                  <div className="t-align-left" ><Link className="white" to="/">Back to post listing page</Link></div>
                  <h2>  Edit  </h2>
                </div>
                <form    onSubmit={handleSubmit(this.onSubmit.bind(this),"POST_EDIT")}>
                  <Field
                      label="Title"
                      name="title"
                      component={this.renderField}
                      initialValue={this.props.post? this.props.post.title : '' }
                
                      
                   
                    
                  />
                  
                  <Field
                      editmode={true}
                      label="Post Content"
                      name="body"
                      component={this.renderField}
                      initialValue={this.props.post ? this.props.post.body : '' }
                      
                     
  
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

function mapStateToProps(state ,ownProps){

    const params = ownProps.match.params.id; 
    return { post:  state.posts[params]}

}


export default reduxForm({
  validate,
  form:'EditForm',
  
 
  
})(
 connect(mapStateToProps,{loadPost, edit , changeField})(Edit)
);


