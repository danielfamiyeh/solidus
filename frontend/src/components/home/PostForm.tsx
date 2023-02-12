import Image from 'next/image';
import { useState } from 'react';

import Modal from '@/components/display/Modal';
import writeIcon from '@/assets/home/header/write.svg';

function PostForm() {
  const [showModal, setShowModal] = useState(false);
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
        Footer={<div>Footer</div>}
        onHide={() => setShowModal(false)}
      >
        <div>Modal body</div>
      </Modal>
    </>
  );
}

export default PostForm;
