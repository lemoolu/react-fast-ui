import React from 'react'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
const components = {
  pre: props => <div {...props} />,
  code: props => <pre style={{ color: 'tomato' }} {...props} />
}


const Home = (props) => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <div>
      2323
    </div>
  </div>
)

export default Home
