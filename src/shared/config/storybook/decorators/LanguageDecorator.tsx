import type { Decorator } from '@storybook/react-vite'
import i18n from '../../i18n/i18n';
import { I18nextProvider } from 'react-i18next';
import { Suspense, useEffect } from 'react';
// import { Spinner } from '@/shared/ui';

const LanguageDecorator: Decorator = (Story, context) => {
    const { locale } = context.globals;

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale])

    return (
        <Suspense fallback={<></>} >
            <I18nextProvider i18n={i18n}>
                <Story {...context} />
            </I18nextProvider>
        </Suspense>
    )
}

export default LanguageDecorator
