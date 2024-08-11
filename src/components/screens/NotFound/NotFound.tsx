'use client';

import Link from 'next/link';
import Image from 'next/image';
import Title from '@shared/Title/Title';
import lostImg from '/public/images/lost.png';
import loader from '/public/images/giphy.webp';
import { useSearchParams } from 'next/navigation';
import styles from './NotFound.module.scss';

const NotFoundPage: React.FC = () => {
  const searchParams = useSearchParams();

  return (
    <div className="error-container">
      <Title title="Have lost in space?" />
      <Title title="Click on the portal to get back home" level={2} color="white" />
      <div className={styles.container}>
        <Image src={lostImg} alt="Lost img" className={styles.rick} height={400} />
        <Link data-testid="link" href={`/?${searchParams.toString()}`}>
          <Image src={loader} alt="Portal img" className={styles.rick} />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
