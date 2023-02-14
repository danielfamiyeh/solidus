import Image from 'next/image';
import { useState } from 'react';

import Modal from '@/components/display/Modal';
import cogIcon from '@/assets/home/header/cog.svg';
import accountIcon from '@/assets/home/account/account.svg';

function SettingsForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onSubmit = () => {};

  return (
    <>
      <button
        className="hover:opacity-50 active:opacity-25"
        onClick={() => setShowModal(true)}
      >
        <Image src={cogIcon} width={32} height={32} alt="User settings icon" />
      </button>

      <Modal
        show={showModal}
        title="Account Settings"
        onHide={() => setShowModal(false)}
        Footer={
          <footer className="text-center">
            <button
              className="border-4 border-black px-2 py-1 font-bold hover:opacity-50 active:opacity-25"
              onClick={onSubmit}
            >
              Submit
            </button>
          </footer>
        }
      >
        <div className="flex flex-col gap-y-px pt-2">
          <button className="rounded-full border-4 border-black self-center w-[128px] h-[128px] hover:opacity-50 active:opacity-25">
            <Image src={image ? image : accountIcon} alt="Account icon" />
          </button>

          <fieldset className="flex flex-col">
            <label htmlFor="nameInput">
              <h1>Name</h1>
            </label>
            <input
              type="text"
              id="nameInput"
              placeholder="Enter your name..."
              className="px-2 py-4 border-4 border-black"
            />
          </fieldset>
        </div>
      </Modal>
    </>
  );
}

export default SettingsForm;
