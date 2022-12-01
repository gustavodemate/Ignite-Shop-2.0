import Image from "next/image";
import { formatCurrencyString } from "use-shopping-cart";
import { CartProduct, CartProductDetails, CartProductImage } from "./styles";
import { CartActions, CartEntry as ICartEntry } from 'use-shopping-cart/core'


interface CartEntryProps {
    entry: ICartEntry
    removeItem: CartActions['removeItem']
  }

export function CartEntry({ entry, removeItem }: CartEntryProps) {
    return (
        <section>
        <CartProduct key={entry.id}>
            <CartProductImage>
                <Image src={entry.imageUrl} width={100} height={100} alt=""/>
            </CartProductImage>
            <CartProductDetails>
            <p>{entry.name}</p>
            <strong>
            {formatCurrencyString({
            value: entry.price * entry.quantity,
            currency: 'BRL',
            language: 'pt-BR',
        
        })}
            </strong>
            <button onClick={() => removeItem(entry.id)} >Remover</button>
            </CartProductDetails>
        </CartProduct>
 </section>
)}
    
