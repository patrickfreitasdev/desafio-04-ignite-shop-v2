import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

interface ProductProps {
    product: {
        id: string,
        product_id: string;
        name: string,
        imgUrl: string,
        price: number,
        description: string,
        defaultPriceId: string,
        currency: 'BRL'
    }
}

export default function Product({ product }: ProductProps) {


    const { addItem } = useShoppingCart();

    if (!product) {
        return;
    }

    async function handleBuyProduct() {
        addItem(product, {
            count: 1,
            product_metadata: {
                type: 'product'
            }
        })
    }

    return (
        <>
            <Head>
                <title>Ignite Shop - {product.name}</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imgUrl} width={520} height={480} alt="" />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>
                        {formatCurrencyString({
                            value: product.price,
                            currency: 'BRL',
                            language: 'pt-BR'
                        })
                        }
                    </span>
                    <p>{product.description}</p>
                    <button onClick={handleBuyProduct}>Colocar na sacola</button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_ON1EkF6Ow7IbwN' } }
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const produdctId = params!.id;

    const product = await stripe.products.retrieve(produdctId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: price.id,
                product_id: product.id,
                name: product.name,
                imgUrl: product.images[0],
                price: price.unit_amount,
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1 // 1h hora
    }
}