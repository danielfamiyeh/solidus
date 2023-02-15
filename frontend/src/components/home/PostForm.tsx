import Image from 'next/image';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

import Modal from '@/components/display/Modal';
import writeIcon from '@/assets/home/header/write.svg';
import { useMetamask } from '../context/MetamaskContext';

function PostForm() {
  const { contract } = useMetamask();
  const queryClient = useQueryClient();
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onCreatePost = () => {
    contract
      .createPost(postText, postImage)
      .then((res: any) => {
        queryClient.invalidateQueries('feed');
        setShowModal(false);
        setPostText('');
      })
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
        <fieldset className="flex flex-col">
          <label htmlFor="textInput">
            <h1>Text</h1>
          </label>
          <textarea
            placeholder="Start typing..."
            className="resize-none w-[100%] border-black border-2 p-2 pb-64"
            onChange={({ target: { value } }) => setPostText(value)}
            value={postText}
          />
        </fieldset>

        <fieldset className="flex flex-col mt-4">
          <label htmlFor="imageInput">
            <h1>Image</h1>
          </label>
          <input
            type="text"
            placeholder="Paste image URL..."
            className="resize-none w-[100%] border-black border-2 p-2"
            onChange={({ target: { value } }) => setPostImage(value)}
            value={postImage}
          />
        </fieldset>
      </Modal>
    </>
  );
}

export default PostForm;
