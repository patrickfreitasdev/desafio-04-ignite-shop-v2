import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
})


export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between'
})

export const CartButtonHeader = styled('button', {
    cursor: 'pointer',
    background: '$gray800',
    border: 0,
    borderRadius: 6,
    height: 48,
    width: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    svg: {
        color: '$gray100'
    },

    span: {
        position: 'absolute',
        top: -12,
        right: -12,
        height: 24,
        width: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '$green500',
        color: '$gray100',
        border: '3px solid $gray900',
        borderRadius: 999,
    }
})