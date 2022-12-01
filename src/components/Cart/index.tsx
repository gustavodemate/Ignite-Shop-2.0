import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { X } from 'phosphor-react';
import { CartButton } from '../CartButton';
import { CartClose, CartContainer, CartFooter, CartFooterDetails, CartProduct, CartProductDetails, CartProductImage } from './styles';
import { formatCurrencyString, useShoppingCart, } from 'use-shopping-cart'
import axios from 'axios';
import Stripe from 'stripe';
import { useState } from 'react';
import Home from '../../pages';
import { CartEntry } from './CartEntry';

export function Cart() {
    const {  
        removeItem,
        cartDetails,
        redirectToCheckout,
        cartCount,
        formattedTotalPrice,
        } = useShoppingCart()

        const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
        


        async function handleCheckout() {
            try {
                setIsCreatingCheckoutSession(true)
                const response =
                await axios.post('/api/checkout', {
                    cartDetails,
                    
                })

                const { checkoutUrl } = response.data
                 
                window.location.href = checkoutUrl
                } catch (error) {
            
                setIsCreatingCheckoutSession(false)

                alert('Falha ao redirecionar para o checkout')
                }               
                
            }
            
            const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
                <CartEntry key={entry.id} entry={entry} removeItem={removeItem} />
              ))
              

            return (
        <>
    
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <CartButton />
            </Dialog.Trigger>

            <Dialog.Portal>
                <CartContainer>
                    <CartClose>
                        <X size={24} weight="bold"/>
                    </CartClose>

                    <h2>Sacola de compras</h2>

                    {cartEntries.length > 0 ? cartEntries : null}

                    <CartFooter>
                        <CartFooterDetails>
                            <div>
                                <span>Quantidade</span>
                                <p>{cartCount} itens</p>
                            </div>
                            <div>
                                <span>Valor total</span>
                                <p>{formattedTotalPrice}</p>
                            </div>

                        </CartFooterDetails>
                        <button onClick={handleCheckout} disabled={cartCount < 1}>
                            Finalizar compra
                        </button>
                    </CartFooter> 
                </CartContainer>
            </Dialog.Portal>
        </Dialog.Root>
    </>
    )
}