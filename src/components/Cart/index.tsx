import { CartCloseButton, CartContainer, CartTotalValor, CartTotalsContainer, CartTotalsQuantidade, CheckoutButton, ImageContainer, ProductContainer, ProductDetails, ProductWrapper } from "@/styles/components/cart";
import { X } from "@phosphor-icons/react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import CartItem from "../CartItem";
import { useState } from "react";
import axios from "axios";

interface CartProps {
    handeClick: () => void
}
export default function Cart({ handeClick }: CartProps) {


    const { cartCount, cartDetails, totalPrice } = useShoppingCart();
    const [status, setStatus] = useState('')


    async function handleClick() {
        if (cartCount && cartCount > 0) {
            setStatus('idle')
            try {

                const response = await axios.post('/api/checkout', {
                    products: cartDetails,
                    count: cartCount
                })

                const { checkoutUrl } = response.data;

                window.location.href = checkoutUrl;

            } catch (err) {

                alert('Falha ao redirecionar ao checkout!')
            }
        } else {
            setStatus('missing-items')
        }
    }

    return (
        <CartContainer>
            <CartCloseButton title="Fechar" onClick={handeClick}>
                <X size={24} />
            </CartCloseButton>
            <h2>Sacola de Compras</h2>
            <ProductWrapper>

                {cartCount && cartCount > 0 ? (
                    <>
                        {Object.values(cartDetails ?? {}).map((product) => (
                            <CartItem
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                quantity={product.quantity}
                                imgUrl={product.imgUrl}
                                formattedPrice={product.formattedPrice}
                                formattedValue={product.formattedValue}
                            />
                        ))}

                    </>
                ) : (
                    <div><h3>Seu carrinho está vazio :(</h3></div>
                )}


            </ProductWrapper>
            <CartTotalsContainer>
                <CartTotalsQuantidade>
                    <h4>Quantidade</h4>
                    <span>{cartCount} items</span>
                </CartTotalsQuantidade>
                <CartTotalValor>
                    <span>Valor total</span>
                    <strong> {formatCurrencyString({
                        value: totalPrice!,
                        currency: 'BRL',
                        language: 'pt-BR'
                    })
                    }</strong>
                </CartTotalValor>
                <CheckoutButton disabled={(cartCount! === 0 || status == 'idle')} onClick={handleClick}>
                    Finalizar Compra
                </CheckoutButton>
            </CartTotalsContainer>
        </CartContainer>
    )
}