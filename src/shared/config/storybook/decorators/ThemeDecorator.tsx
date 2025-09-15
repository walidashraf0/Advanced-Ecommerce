import type { Decorator } from '@storybook/react-vite'

const ThemeDecorator: Decorator = (Story, context) => {

    const { theme } = context.globals;

    return (
        <div className={theme}>
            <Story {...context} />
        </div>
    )
}

export default ThemeDecorator
