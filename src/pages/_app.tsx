import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import logoImg from '../assets/logo.svg';
import { CartButtonHeader, Container, Header } from '@/styles/pages/app';
import Image from 'next/image';
import { Handbag } from '@phosphor-icons/react';
import Link from 'next/link';
import Cart from '@/components/Cart';
import { useState } from 'react';
import { CartProvider, useShoppingCart } from 'use-shopping-cart'
import HeaderCartButton from '@/components/CartButton';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  const [cartOpen, serCartOpen] = useState<boolean>(false);

  function handleCartOpenClose() {
    serCartOpen(!cartOpen)
  }

  return (
    <CartProvider
      cartMode='checkout-session'
      // Connects to our Stripe account (stored in an .env.local file)
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
      // Redirected here after successful payments (url stored in .env.local file)
      currency="BRL"
      // Enables local storage
      shouldPersist={true}
    >
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg.src} width={logoImg.width} height={logoImg.height} alt='' />
          </Link>
          <HeaderCartButton handleCartOpenClose={handleCartOpenClose} />
          {cartOpen && <Cart handeClick={handleCartOpenClose} />}
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
