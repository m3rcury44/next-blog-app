"use client"

import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import Arrow from '@/shared/UIKit/arrow';

const BackButton = () => {

  const router = useRouter()

  return (
    <button onClick={() => router.back()} className={styles.backButton}>
      <Arrow/>
      Back
    </button>
  );
};

export default BackButton;
