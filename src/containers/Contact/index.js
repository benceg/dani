import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import head from 'lodash/head';
import get from 'lodash/get';
import Color from 'color';
import { componentWillMount } from 'react-lifecycle-decorators';

import {
  fetchContent,
  resetForm,
  sendForm
} from './actions';

import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import AppView from '../../components/AppView';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import Image from '../../components/Image';
import ContactForm from '../../components/ContactForm';

import routerLink from '../../helpers/routerLink';

if (process.env.WEBPACK) require('./stylesheet.styl');

const tint = '#41396b';

const handleSubmit = (dispatch) =>
  (fields) =>
    dispatch(sendForm(fields));

const Contact = ({
  body,
  image,
  slug,
  title,
  error,
  sent,
  dispatch
}) =>

<AppView className='Contact' tint={tint} title={title}>

  <Helmet
    meta={[{name: 'og:image', content: `${get(image, 'fields.file.url')}?fit=thumb&w=600&h=600`}]}
    style={[{cssText: `.Contact [type="submit"] { background-color: ${Color(tint).darken(0.5).hexString()}; }`}]}
  />

  <Main>
    <Image alt={title} src={get(image, 'fields.file.url')} />
  </Main>

  <Sidebar tint={tint} fade={true}>
    <article>
      <h1>{title}</h1>
      <section>
        <ReactMarkdown source={body || ''} escapeHtml={true} renderers={{Link: routerLink}} />
      </section>
      {error && <p className='error-message'>Sorry, there was a problem sending your form.</p>}
      {sent && <p className='success-message'>Thank you for your message.</p>}
      {!sent && <ContactForm action='/send' method='post' handleSubmit={handleSubmit(dispatch)} />}
    </article>
  </Sidebar>

</AppView>

Contact.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  body: React.PropTypes.string,
  image: React.PropTypes.object,
  title: React.PropTypes.string.isRequired,
  sent: React.PropTypes.bool,
  error: React.PropTypes.bool
};

const mapStateToProps = ({ contact }) => ({
  loaded: contact.loaded,
  body: contact.content.body,
  image: contact.content.image,
  title: contact.content.title,
  sent: contact.sent,
  error: contact.error
});

export default asyncConnect(
  [{
    promise: ({ store: { dispatch } }) => dispatch(fetchContent())
  }],
  mapStateToProps
)(componentWillMount(({ dispatch }) => dispatch(resetForm()))(Contact));
