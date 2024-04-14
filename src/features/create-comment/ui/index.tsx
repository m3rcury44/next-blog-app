'use client';

import styles from './styles.module.scss';
import { AvatarIcon } from '../../../app/assets/images';
import { useCreateComment } from '../model';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const CreateComment = ({ postId, userImage }: { postId: string, userImage: string | null }) => {

  const queryClient = useQueryClient();

  const [value, setValue] = useState('');

  const { mutate } = useCreateComment({ setValue, postId, queryClient });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (value.length) {
      mutate({ content: value, postId })
    } else {
      toast.error("Comment cannot be empty")
    }
  }

  return (
    <div className={styles.createComment}>
      <Image src={userImage || AvatarIcon} alt="avatar" height={40} width={40} />
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your comment..."
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">
          Add comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
