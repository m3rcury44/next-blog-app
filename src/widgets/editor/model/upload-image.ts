import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { app } from '@/shared/lib';
import { IPost } from '@/shared/types';

const storage = getStorage(app);

interface IUploadImage {
  file?: File
  post?: IPost
  imagePreview: string | null
  title: string
  desc: string
  content: string
}

export const uploadImage = async ({file, post, imagePreview, title, desc, content}: IUploadImage) => {
  if (file) {
    if ((post && imagePreview !== post.image) || title && desc && content) {
      const storageRef = ref(storage, file?.name + Math.random());

      const uploadResult = await uploadBytes(storageRef, file);
      return await getDownloadURL(uploadResult.ref);
    }
  }
}
