import React, { FC } from 'react';
import { CloverDataLayer } from '@clover/data-layer';
import { useTranslation } from 'react-i18next';
import './i18n';

import styles from './styles.module.scss';

export const App: FC = () => {
  const { t } = useTranslation();

  return (
    <CloverDataLayer>
      <div className={styles.main}>
        <h1 className={styles.heading}>Scheduling Service</h1>
        <h2>{t('helloWorld')}</h2>

        <div className={styles.congrats}>
          <p>
            🎉 Congratulations! If you are seeing this component that means your micro app has loaded
            successfully! 🎉
          </p>
        </div>
      </div>
    </CloverDataLayer>
  );
};

export default App;
