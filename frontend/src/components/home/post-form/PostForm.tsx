import Image from 'next/image';

import writeIcon from '@/assets/home/header/write.svg';

function PostForm() {
  const onCreateButtonClick = () => {};
  return (
    <>
      <button
        className="hover:opacity-50 active:opacity-25"
        onClick={onCreateButtonClick}
      >
        <Image src={writeIcon} width={32} height={32} alt="Write post icon" />
      </button>
    </>
  );
}

export default PostForm;
