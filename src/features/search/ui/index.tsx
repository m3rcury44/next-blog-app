"use client"

import styles from './styles.module.scss';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/UIKit/buttons';

const Search = () => {

  const router = useRouter()

  const searchParams = useSearchParams()

  const page = (searchParams.get('page') || 1)
  const search = searchParams.get('search')
  const sort = (searchParams.get('sort') || 'initial')

  const [value, setValue] = useState(search || '')

  const handleNavigate = (e: FormEvent) => {
    e.preventDefault()

    router.push(`/?page=${page}&sort=${sort}&search=${value}`)
  }

  const handleResetSearch = (e: FormEvent) => {
    e.preventDefault()

    setValue('')
  }

  return (
    <search className={styles.search}>
      <form onSubmit={handleNavigate} onReset={handleResetSearch}>
        <div>
          <input placeholder="Enter your request..." type="text" onChange={e => setValue(e.target.value)} value={value} />
          {value && <button type="reset">
            <svg viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff"
                    d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
            </svg>
          </button>}
        </div>
        <Button type="submit">Search</Button>
      </form>
    </search>
  );
};

export default Search;
