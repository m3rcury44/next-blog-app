import { Dispatch, MouseEvent, RefObject, SetStateAction, useEffect } from 'react';

export const useOutsideClick = (attached: boolean, handler: Dispatch<SetStateAction<boolean>>, ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!attached) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        handler(false);
      }
    };

    document.addEventListener('click', handleClickOutside as never);

    return () => document.removeEventListener('click', handleClickOutside as never);
  }, [ref, attached, handler]);
}
