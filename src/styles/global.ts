import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
    },

    body: {
        background: '$gray900',
        color: '$gay100',
        '-webkit-font-smoothing': 'antialiased',
    },

    'body, input, textearea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
    },
})