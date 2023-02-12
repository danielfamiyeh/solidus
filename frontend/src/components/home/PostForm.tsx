import Image from 'next/image';
import { useState } from 'react';

import Modal from '@/components/display/Modal';
import writeIcon from '@/assets/home/header/write.svg';

function PostForm() {
  const [showModal, setShowModal] = useState(false);
  const onCreatePost = () => {};
  return (
    <>
      <button
        className="hover:opacity-50 active:opacity-25"
        onClick={() => setShowModal(true)}
      >
        <Image src={writeIcon} width={32} height={32} alt="Write post icon" />
      </button>

      <Modal
        show={showModal}
        title="Create Post"
        Footer={
          <footer className="flex justify-between">
            <button
              className="border-4 border-rose-600 text-rose-600 px-2 py-1 hover:opacity-50 active:opacity-25"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="border-4 border-black px-2 py-1 hover:opacity-50 active:opacity-25"
              onClick={onCreatePost}
            >
              Submit
            </button>
          </footer>
        }
        onHide={() => setShowModal(false)}
      >
        <textarea className="resize-none w-[100%] border-black border-2 p-2 pb-64" />
      </Modal>
    </>
  );
}

export default PostForm;
