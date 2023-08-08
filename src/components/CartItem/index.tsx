import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/components/cart";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

interface CartItemProps {
    id: string,
    name: string,
    imgUrl: string,
    quantity: number,
    formattedPrice: string,
    formattedValue: string
}

export default function CartItem({ id, name, quantity, imgUrl, formattedPrice, formattedValue }: CartItemProps) {

    const { decrementItem } = useShoppingCart();

    function handleRemoveItem() {
        decrementItem(id)
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={imgUrl} width={72} height={72} objectFit="cover" alt="" />
            </ImageContainer>
            <ProductDetails>
                <h3>{name}</h3>
                <span>{formattedPrice}</span>
                <small>Quantidades: {quantity}x</small>
                <strong>Valor Total: {formattedValue}</strong>
                <button onClick={handleRemoveItem}>Remover</button>
            </ProductDetails>
        </ProductContainer>
    )
}