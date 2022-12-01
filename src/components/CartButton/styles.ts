import { styled } from "../../styles";

export const CartButtonContainer = styled('button', {
    width: '3rem',
    height: '3rem',
    borderRadius: 6,
    background: '$gray800',
    color: '$gray300',
    position: 'relative',
    border: 0,
    cursor: 'pointer',

    transition: 'all 0.2s ease-in-out',

    '&:disabled': {
        cursor: 'not-allowed',
        color: '$gray500',
      },

      '&:not(:disabled):hover': {
        color: '$green500',
      },

      span: {
        position: 'absolute',
        top: -12,
        right: -8,
        width: '1.5rem',
        height: '1.5rem',
    
        color: '$gray100',
        backgroundColor: '$green500',
        fontSize: '0.875rem',
        fontWeight: 'bold',
    
        borderRadius: 50,
        border: '2px solid $gray800',
    
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddin: '0.25rem',
      },
})