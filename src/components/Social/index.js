import React from 'react';

if (process.env.WEBPACK) require('./stylesheet.styl');

import {
  FacebookButton,
  FacebookCount,
  TwitterButton,
  TwitterCount,
  RedditButton,
  RedditCount,
  EmailButton
} from 'react-social';

const getUrl = () => `https://daniellebooysen.com${location.pathname}`

const Social = ({
  title
}) =>

(process.env.WEBPACK
  ?
    <ul className='Social'>
      <li>
        <FacebookButton title='Share via Facebook' url={getUrl()} element="a" appId='1070630266388690' className='icon-facebook'>
          <FacebookCount url={getUrl()} />
        </FacebookButton>
      </li>
      <li>
        <TwitterButton title='Share via Twitter' url={getUrl()} element="a" message={`Danielle Booysen — ${title}\n\n`} className='icon-twitter'>
          <TwitterCount url={getUrl()} />
        </TwitterButton>
      </li>
      <li>
        <RedditButton title='Share via Reddit' url={getUrl()} element="a" className='icon-reddit'>
          <RedditCount url={getUrl()} />
        </RedditButton>
      </li>
      <li>
        <EmailButton title='Share via Email' url={getUrl()} element="a" className='icon-envelope' />
      </li>
    </ul>
  :
    <span />
)

export default Social;
