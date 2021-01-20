import 'reflect-metadata'

import 'css.escape'

import 'map.prototype.tojson' // to visualize Map in Redux Dev Tools
import 'set.prototype.tojson' // to visualize Set in Redux Dev Tools
import 'src/helpers/errorPrototypeTojson' // to visualize Error in Redux Dev Tools
import 'src/helpers/functionPrototypeTojson' // to visualize Function in Redux Dev Tools

import { enableES5 } from 'immer'
import dynamic from 'next/dynamic'

import React, { useMemo } from 'react'

import { AppProps } from 'next/app'
import { ConnectedRouter } from 'connected-next-router'
import { SeoApp } from 'src/components/Common/SeoApp'

import { configureStore } from 'src/state/store'
import { ThemeProvider } from 'styled-components'

import { Provider } from 'react-redux'

import { MDXProvider } from '@mdx-js/react'

import { mdxComponents } from 'src/components/Common/MdxComponents'

import { theme } from 'src/theme'

import 'src/styles/global.scss'

enableES5()

function MyApp({ Component, pageProps, router }: AppProps) {
  const store = useMemo(() => configureStore({ router }), [router])

  return (
    <Provider store={store}>
      <ConnectedRouter>
        <ThemeProvider theme={theme}>
          <MDXProvider components={(components) => ({ ...components, ...mdxComponents })}>
            <SeoApp />
            <Component {...pageProps} />
          </MDXProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false })
