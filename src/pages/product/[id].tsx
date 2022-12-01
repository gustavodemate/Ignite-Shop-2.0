
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        description: string;
        defaultPriceId: string;
        currency: string;
    }
}


export default function Product({ product }: ProductProps) {
    const { addItem, checkoutSingleItem } = useShoppingCart()

    async function handleBuyProduct() {
        try {
            
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl
        } catch (err) {
            // conectar com uma ferramenta de observabilidade (Datadog / Sentry)

            

            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return (
    <>
        <Head>
            <title>{product.name} | Ignite Shop</title>
        </Head>

        <ProductContainer>
            
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
                
            </ImageContainer>
            

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>
                {formatCurrencyString({
                    value: product.price,
                    currency: product.currency,
                })}
                </span>

                <p>{product.description}</p>


                <button onClick={() => addItem(product)}>
                    Colocar na sacola
                </button>
            </ProductDetails>
        </ProductContainer>
    </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: "prod_MmW03Fm1LyQZVI" } }
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount,
                currency: price.currency,
                description: product.description, 
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}