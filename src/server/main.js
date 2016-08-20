import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import path from 'path'
import http from 'http'
import { match, RouterContext, createMemoryHistory } from 'react-router'

import store from './store'

const app = express()

app.use((req, res) => {

  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const memoryHistory = createMemoryHistory(req.originalUrl)
  const history = syncHistoryWithStore(memoryHistory, store)

  const hydrateOnClient = (status = 200) => {
    const html = renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)
    res.status(status).send(`<!doctype html>\n${html}`)
  }

  if (__DISABLE_SSR__) {
    return hydrateOnClient()
  }

  const render = renderProps => {

    const component = (
      <Provider store={store} key="provider">
        <RouterContext {...renderProps} />
      </Provider>
    )

    const html = ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} head={config.tags} />)

    return res.status(200).send(`<!doctype html>\n${html}`)

  }

  match({ history, routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {

    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (error) {
      console.error('ROUTER ERROR:', error)
      return hydrateOnClient(500)
    }

    if (renderProps) {

      const attrs = {
        location: renderProps.location,
        params: renderProps.params,
        getState: store.getState,
        dispatch: store.dispatch
      }

      return createServerResolver().triggerHooks(renderProps.components, attrs, render.bind(null, renderProps))
        .catch((e) => {
          console.error(e)
          hydrateOnClient()
        })

    }

    return hydrateOnClient(404)

  })

})
