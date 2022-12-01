import { Handbag } from "phosphor-react";
import { ComponentProps } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CartButtonContainer } from "./styles";

type CartButtonProps = ComponentProps<typeof CartButtonContainer>;

export function CartButton({ ...rest }:CartButtonProps) {
    const { cartCount } = useShoppingCart()

    return (
        <CartButtonContainer {...rest} >
            <Handbag size={24} color="#8D8D99" weight="bold"/>

            {cartCount > 0 && <span>{cartCount}</span>}
        </CartButtonContainer>
    )
}