import { useTranslation } from 'react-i18next';

import { Spinner } from '@/shared/ui';

import styles from './PageLoader.module.scss';

const PageLoader = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                {t('PageLoader.loading')}
            </h1>
            <Spinner />
        </div>
    )
}

export default PageLoader
