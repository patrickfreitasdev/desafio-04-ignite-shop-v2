import { stripe } from "@/lib/stripe";
import { ImageContainer, ImagesWrapper, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";


interface SuccessProps {
    customerName: string,
    products: {
        countItems: number,
        productImgs: string[]
    }
}
export default function Success({ customerName, products }: SuccessProps) {

    const { clearCart } = useShoppingCart();

    useEffect(() => {
        clearCart();
    }, [clearCart])

    return (
        <>
            <Head>
                <title>Compra Efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                <h1>Compra efetuada!</h1>

                <ImagesWrapper>
                    {products.productImgs.map((img) => {
                        return (
                            <ImageContainer key={img}>
                                <Image src={img} width={90} height={90} alt="" objectFit="cover" />
                            </ImageContainer>
                        )
                    })}
                </ImagesWrapper>


                <p>
                    Uhuul {customerName}, sua compra de {products.countItems} camisetas já está a caminho da sua casa.
                </p>

                <Link href='/'>
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionId = String(query.session_id);


    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    });

    const customerName = session.customer_details?.name;
    const products = session.line_items?.data.reduce((accumulator: { countItems: number; productImgs: string[] }, currentValue) => {
        const product = currentValue.price?.product as Stripe.Product;
        const productImg = product.images[0];

        return {
            countItems: accumulator.countItems + currentValue.quantity!,
            productImgs: [...accumulator.productImgs, productImg]
        };
    }, {
        countItems: 0,
        productImgs: []
    });

    return {
        props: {
            customerName,
            products
        }
    }
}