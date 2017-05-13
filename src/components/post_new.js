import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${ touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className} >
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          { touched ? error : ' '}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  // handle submit takes a function that we define and pass that to handleSubmit
  // so redux form checks for errors and then execute the callback passed to handleSubmit
  // we pass bind this to make sure that this will be the this form the component
  render() {
    // this is a function that has been passed to postNew by redux form
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <div>
            <Field
              label='Title'
              name='title'
              component={ this.renderField }
            />
          </div>
          <Field
            label='Categories'
            name='category'
            component={ this.renderField }
          />
          <Field
            label='Post Body'
            name='body'
            component={ this.renderField }
          />
          <button type='submit' className='btn btn-primary'>Save</button>
          <Link className='btn btn-danger' to='/'>
            Cancel
          </Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  // validate the imputs form values
  if (!values.title) {
    errors.title = 'Enter a title';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }

  if (!values.body) {
    errors.body = 'Enter body';
  }
  // if errors is empty, the form is fine to submit
  // if errors has any properties, form is invalid
  return errors;
}

// the PostNewForm is the name of the form in case we have multiple forms on the screen
// the name should be unique
// Rredux form wires up this component to the form reducer in reducers.
// ReduxForm adds a ton of new functionality to our components as connect()() does
export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostNew)
);

// component={} takes in a function that will be used to display the component
// the field component doesnt know how to render itself on the screen it only interacts with redux form
// this is where the component={} is being used. It's the thing that interracts directly with the user
// and it's our job to define this component and how the field will appear on the screen
// we just have to pass a function without calling it becaue the field will call it automatically.
