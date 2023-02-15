import Image from 'next/image';
import { useState } from 'react';

import Modal from '@/components/display/Modal';
import cogIcon from '@/assets/home/header/cog.svg';
import accountIcon from '@/assets/home/account/account.svg';
import { useMetamask } from '../context/MetamaskContext';

function SettingsForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [bio, setBio] = useState('');

  const { account, contract, signer, disconnect, isConnecting } = useMetamask();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = () => {
    contract.userUpdate(name, image, coverPhoto, bio);
  };

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
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              type="text"
              id="nameInput"
              placeholder="Enter your name..."
              className="px-2 py-4 border-4 border-black"
            />
          </fieldset>

          <fieldset className="flex flex-col mt-4">
            <label htmlFor="nameInput">
              <h1>Bio</h1>
            </label>
            <input
              value={bio}
              onChange={({ target: { value } }) => setBio(value)}
              type="text"
              id="nameInput"
              placeholder="Enter your bio..."
              className="px-2 py-4 border-4 border-black"
            />
          </fieldset>
        </div>
        <div className="mt-3 text-center">
          <button
            className="px-4 py-2 bg-black text-white hover:opacity-75 active:opacity-50 disabled:opacity-50"
            disabled={isConnecting}
            onClick={disconnect}
          >
            Sign Out
          </button>
        </div>
      </Modal>
    </>
  );
}

export default SettingsForm;
