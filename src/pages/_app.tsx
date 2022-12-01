import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart';
import { Header } from '../components/Header';
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app';


globalStyles();

const stripeKey = process.env.STRIPE_PUBLIC_KEY

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={stripeKey} 
      currency="BRL"
      shouldPersist={true}
      loading={<p aria-live="polite">Loading redux-persist...</p>}
    >
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
