import type { Decorator } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router'

const RouterDecorator: Decorator = (Story, context) => {

    return (
        <BrowserRouter>
            <Story {...context} />
        </BrowserRouter>
    )
}

export default RouterDecorator
