import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'

import { useKeenSlider } from 'keen-slider/react';

import { HomeContainer, Product } from "../styles/pages/home";
import { stripe } from "../lib/stripe";

import 'keen-slider/keen-slider.min.css';
import Stripe from "stripe";
import { Handbag } from "phosphor-react";
import {  CartEntry as ICartEntry } from 'use-shopping-cart/core'

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    currency: string;
    price_id: string,

  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48, 
    }
  })

  return (
  <>
    <Head>
      <title>Home | Ignite Shop</title>
    </Head>

    <HomeContainer ref={sliderRef} className='keen-slider'>
      
      {products.map(product => {
        return (   
      <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>    
        <Product className="keen-slider__slide">
        <Image src={product.imageUrl} width={520} height={480} alt=""/>

          <footer>
            <div>
              <strong>{product.name}</strong>
              <span>{formatCurrencyString({
                    value: product.price,
                    currency: product.currency,
                })}</span>
            </div>

            <button>
              <Handbag size={32} color="#FFFF" weight="bold" onClick={() => addItem(product) }/>
            </button>
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
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      currency: price.currency,
      price_id: price.id,   
    }
    
  })

  return{
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }


}