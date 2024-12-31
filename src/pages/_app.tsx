import type { AppProps } from 'next/app'
import "../app/styles/index.scss"
import { AuthStoreProvider } from '@/app/providers/auth-store-provider'

 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthStoreProvider>
      <Component {...pageProps} />
    </AuthStoreProvider>
  )
}