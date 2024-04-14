'use client';

import styles from './styles.module.scss';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

const EditButton = ({ slug }: { slug: string }) => {

  const router = useRouter();

  const navigateToEditPage = (e: MouseEvent) => {
    e.preventDefault()

    router.push(`/post/${slug}/edit`)
  }

  return (
    <button className={styles.editButton} onClick={navigateToEditPage} aria-label="Edit post">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#808080" stroke="#808080">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><title></title>
          <g id="Complete">
            <g id="edit">
              <g>
                <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#808080"
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#808080"
                         strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
};

export default EditButton;
