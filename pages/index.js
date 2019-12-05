import React from 'react'
import Head from 'next/head'
import {MDXProvider} from '@mdx-js/react'
const components = {
  pre: props => <div {...props} />,
  code: props => <pre style={{ color: 'tomato' }} {...props} />
}


const Home = (props) => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <MDXProvider components={components}>
    <main {...props}>
    </main>
  </MDXProvider>
  </div>
)

export default Home
