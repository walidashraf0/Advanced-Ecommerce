import { useTranslation } from 'react-i18next';
import styles from './PageLoader.module.scss';
import { Spinner } from '@/shared/ui';
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
