import { CartButtonHeader } from "@/styles/pages/app";
import { Handbag } from "@phosphor-icons/react";
import { useShoppingCart } from "use-shopping-cart";

interface HeaderCartButtonProps {
    handleCartOpenClose: () => void
}

export default function HeaderCartButton({ handleCartOpenClose }: HeaderCartButtonProps) {

    const { cartCount } = useShoppingCart();
    return (
        <CartButtonHeader onClick={handleCartOpenClose}>
            {(cartCount! > 0) && <span>{cartCount}</span>}
            <Handbag size={22} />
        </CartButtonHeader>
    )
}