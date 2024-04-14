'use client';

import styles from './styles.module.scss';
import 'easymde/dist/easymde.min.css';
import {createPost, updatePost, uploadImage} from '../model';
import {ChangeEvent, useMemo, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {toast} from 'sonner';
import DeletePostButton from '@/features/delete-post-button';
import {CreatePostButton} from '@/shared/UIKit/buttons';
import Loader from '@/shared/UIKit/loader';
import {IPost} from '@/shared/types';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
    loading: () => <div style={{height: '402px', display: 'grid', placeItems: 'center'}}><Loader/></div>,
});

const Editor = ({post}: { post?: IPost }) => {

    const [file, setFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState(post?.image ? post.image : null);
    const [title, setTitle] = useState(post?.title || '');
    const [desc, setDesc] = useState(post?.description || '');
    const [content, setContent] = useState(post?.content || '');

    const inputRef = useRef<HTMLInputElement>(null)

    const router = useRouter();

    const options = useMemo(() => ({
        autofocus: true,
        placeholder: 'Enter your content...',
        spellChecker: false,
        theme: 'custom',
    }), []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const userFile = e.target.files?.[0];
        console.log('helloo')

        if (userFile?.type.startsWith('image')) {
            setFile(userFile);
            setImagePreview(URL.createObjectURL(userFile as Blob));
        } else {
            console.warn('Upload an image');
        }
    };

    const handleDeleteImage = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }

        setFile(undefined);
        setImagePreview('');
    };

    const handleCreatePost = async () => {
        try {
            if (file && file.size > 16777216) {
                toast.error('Your image is so big');
                return;
            }

            const downloadURL = await uploadImage({post, imagePreview, file, title, desc, content});

            if (post) {
                const isSuccess = await updatePost({post, imagePreview, title, desc, content, downloadURL});

                if (isSuccess) {
                    router.push(`/post/${post?.slug}`);
                }
            } else {
                const slug = await createPost({title, desc, content, downloadURL});

                if (slug) {
                    router.push(`/post/${slug}`);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className={styles.buttons}>
                <label htmlFor="file">
                    <input ref={inputRef} type="file" name="file" id="file" onChange={handleChange}/>
                    <span>Upload image</span>
                </label>
                {imagePreview?.length ?
                    <button onClick={handleDeleteImage}>
                        <p>Delete image</p>
                    </button>
                    : ''}
                {post && <DeletePostButton style={{marginLeft: 'auto'}} slug={post.slug}/>}
            </div>
            {imagePreview?.length ?
                <Image src={imagePreview} alt="preview" width={0} height={500} sizes="100vw" priority/>
                : ''
            }
            <div className={styles.inputs}>
                <input
                    placeholder="Enter your title..."
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    placeholder="Enter your description..."
                    type="text"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
            </div>
            <SimpleMdeReact onChange={(e) => setContent(e)} value={content} options={options}/>
            <CreatePostButton style={{margin: '20px 0 0 auto'}} onClick={handleCreatePost}>
                {post ? 'Update post' : 'Create new post'}
            </CreatePostButton>
        </>
    );
};

export default Editor;
