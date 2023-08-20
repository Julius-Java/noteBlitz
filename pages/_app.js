import Layout from '@/components/Layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    // Layout
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

// sudo chown -R username directory_name
// You don't have write permission to the file required to run this extension. Please check the permission on "/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.js".