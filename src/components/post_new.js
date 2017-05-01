import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

class PostNew extends Component {
  render() {
    return(
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/">
            Show all Posts
          </Link>
        </div>
        <div>PostNew</div>
      </div>
    )
  }
}

// the PostNewForm is the name of the form
export default reduxForm({
  form: 'PostNewForm'
})( PostNew );
