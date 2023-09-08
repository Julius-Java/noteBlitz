import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { TaskProvider } from '@/components/TaskContext'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const { category } = router.query
  const fullPath = router.asPath
  const activeCategory = category || "Default"

  return (
    // Layout
    <ThemeProvider attribute='class' enableSystem={false}>
      <TaskProvider>
        <Layout category={activeCategory} fullPath={fullPath}>
            <Component {...pageProps} />
        </Layout>
      </TaskProvider>
    </ThemeProvider>
  )
}

// sudo chown -R username directory_name
// You don't have write permission to the file required to run this extension. Please check the permission on "/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.js".