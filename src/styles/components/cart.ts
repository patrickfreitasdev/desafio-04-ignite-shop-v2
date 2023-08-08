import { styled } from "..";

export const CartContainer = styled('div', {
    position: 'fixed',
    right: '0',
    top: '0',
    height: '100vh',
    width: '30rem',
    maxWidth: '100%',
    background: '$gray800',
    zIndex: 999,
    boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80);',
    padding: '4.5rem 3rem 3rem',
    transition: 'all .2s ease',

    display: 'flex',
    flexDirection: 'column',

    h2: {
        color: '$gray500',
        fontWeight: 'bold',
        fontSize: '$lg',
        display: 'block',
        marginBottom: '2rem'
    }
})


export const ProductWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'scroll'
})

export const ProductContainer = styled('div', {
    display: 'flex',
    marginBottom: '1.5rem',
    gap: '1.25rem',
})

export const CartTotalsContainer = styled('div', {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    paddingTop: '1.2rem'
})


export const CartTotalsQuantidade = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',

    h4: {
        fontWeight: '400'
    },

    span: {
        fontSize: '$md'
    }
})

export const CartTotalValor = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',

    span: {
        fontWeight: 'bold',
        fontSize: '$md'
    },

    strong: {
        fontSize: '$lg',
    }
})

export const ImageContainer = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 93,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8
})

export const CheckoutButton = styled('button', {
    background: '$green500',
    border: 0,
    color: '#fff',
    borderRadius: 8,
    padding: '1.25rem 2rem',
    fontWeight: 'bold',
    fontSize: '$md',
    marginTop: '3.5rem',
    cursor: 'pointer',

    '&:not(:disabled):hover': {
        background: '$green300'
    },

    '&:disabled' : {
        cursor: "not-allowed",
        opacity: '.6'
    }
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    h3: {
        fontSize: '$md',
        fontWeight: '400',
        color: '$gray300',
        lineHeight: '160%'
    },

    span: {
        fontWeight: 'bold',
        fontSize: '$md',
        lineHeight: '160%'
    },

    button: {
        marginTop: 'auto',
        background: 'transparent',
        textAlign: 'left',
        border: 0,
        color: '$green500',
        fontSize: '$md',
        lineHeight: '160%',
        fontWeight: 'bold',
        cursor: 'pointer',

        '&:hover': {
            color: '$green300'
        }
    }
})

export const CartCloseButton = styled('button', {
    position: 'absolute',
    top: 24,
    right: 24,
    background: 'transparent',
    border: 0,
    color: '$gray300',
    cursor: 'pointer'
})