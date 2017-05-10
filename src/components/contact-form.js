import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Grid, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames'
import getProp from 'lodash/get'

const validate = values => {
  const errors = {name: {}}
  const notEmptyMsg = 'Não pode estar branco'

  if (!values.name || !values.name.first)
    errors.name.first = notEmptyMsg

  if (!values.name || !values.name.last)
    errors.name.last = notEmptyMsg

  if (!values.phone)
    errors.phone = notEmptyMsg
  else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.phone))
    errors.phone = 'Não é um telefone válido'

  if (!values.email)
    errors.email = notEmptyMsg
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = 'Não é um email válido'

  return errors
}

class ContactForm extends Component {
  componentWillReceiveProps(nextProps) {
    const { contact } = nextProps
    const prop = '_links.self.href'

    if (getProp(contact, prop) !== getProp(this.props.contact, prop))
      this.props.initialize(contact)
  }

  renderField({id, input, label, type, meta: {touched, error}}) {
    return (
      <Form.Field className={classnames({error: touched && error})}>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...input} type={type} placeholder={label} />
        {touched && error && <span className="error">{error}</span>}
      </Form.Field>
    )
  }

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1>{this.props.contact._links ? 'Edit Contact' : 'Add New Contact'}</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Group widths="equal">
              <Field id="name_first" name="name.first" type="text" component={this.renderField} label="First name" />
              <Field id="name_last" name="name.last" type="text" component={this.renderField} label="Last name" />
            </Form.Group>
            <Field id="phone" name="phone" type="text" component={this.renderField} label="Phone" />
            <Field id="email" name="email" type="text" component={this.renderField} label="Email" />
            <Button primary type="submit" disabled={pristine || submitting}>Save</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

ContactForm.propTypes = {
  contact: PropTypes.object.isRequired,
  loading: PropTypes.bool
}

export default reduxForm({form: 'contact', validate})(ContactForm)
