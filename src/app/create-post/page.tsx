import Editor from '@/widgets/editor';
import BackButton from '@/features/back-button';

const CreatePost = async () => {
  return (
    <section>
      <BackButton/>
      <h2>Create post</h2>
      <Editor/>
    </section>
  );
};

export default CreatePost;
