import { HomeAddToCartButton, HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css';
import Head from "next/head";

import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { Handbag } from "@phosphor-icons/react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

interface HomeProps {
  products: {
    product_id: string,
    id: string,
    name: string,
    imgUrl: string,
    price: number,
    currency: 'BRL'
  }[]
}

interface ProductProps {
  product_id: string, // product id
  id: string, // price id
  name: string,
  imgUrl: string,
  price: number,
  currency: 'BRL'
}

export default function Home({ products }: HomeProps) {

  const { addItem } = useShoppingCart();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  function handleAddToCart(product: ProductProps) {
    addItem(product, {count: 1})
  }

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link
              prefetch={false}
              href={`/product/${product.product_id}`}
              key={product.product_id} >
              <Product
                className="keen-slider__slide">
                <Image src={product.imgUrl} width={520} height={480} alt="" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>  {formatCurrencyString({
                      value: product.price,
                      currency: 'BRL',
                      language: 'pt-BR'
                    })
                    }</span>
                  </div>
                  <HomeAddToCartButton onClick={(event) => {
                    event.preventDefault(); handleAddToCart(product)
                  }
                  }>
                    <Handbag size={32} />
                  </HomeAddToCartButton>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {


  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price;

    return {
      product_id: product.id,
      id: price.id,
      name: product.name,
      imgUrl: product.images[0],
      price: price.unit_amount
    }
  })


  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2h
  }
}