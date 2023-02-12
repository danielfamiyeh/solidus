import { FormEvent } from 'react';
import sizes from '@/utils/constants/sizes';

function PostForm() {
  const onSubmitPost = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form
      className={`border-2 h-[${sizes.postFormHeight}px]`}
      onSubmit={onSubmitPost}
    >
      <textarea
        className="w-[100%] h-[100%]"
        placeholder="Begin your post here..."
        style={{ resize: 'none' }}
      />
    </form>
  );
}

export default PostForm;
