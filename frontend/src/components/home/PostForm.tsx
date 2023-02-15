import Image from 'next/image';
import { useState } from 'react';

import Modal from '@/components/display/Modal';
import writeIcon from '@/assets/home/header/write.svg';
import { useMetamask } from '../context/MetamaskContext';

function PostForm() {
  const { contract, signer } = useMetamask();
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState('');

  const onCreatePost = () => {
    contract
      .createPost(postText, '')
      .then((res: any) => console.log({ res }))
      .catch((error: any) => console.log({ error }));
  };
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
          <footer className="text-center">
            <button
              className="border-4 border-black px-2 py-1 font-bold hover:opacity-50 active:opacity-25"
              onClick={onCreatePost}
            >
              Submit
            </button>
          </footer>
        }
        onHide={() => setShowModal(false)}
      >
        <textarea
          className="resize-none w-[100%] border-black border-2 p-2 pb-64"
          onChange={({ target: { value } }) => setPostText(value)}
          value={postText}
        />
      </Modal>
    </>
  );
}

export default PostForm;
