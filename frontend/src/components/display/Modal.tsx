import Image from 'next/image';
import { useEffect, ReactNode, useCallback } from 'react';

import closeIcon from '@/assets/home/header/close.svg';

function Modal(props: ModalProps) {
  const closeOnEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') props.onHide();
    },
    [props]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return props.show ? (
    <div
      className="modal fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
      onClick={props.onHide}
    >
      <div
        className="modal__content bg-[var(--sol-bg-main)] w-[100%] max-w-[500px] border-8 border-black p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header flex items-center justify-between mb-2">
          <h1 className="modal__title text-xl">{props.title}</h1>
          {!!props.closeButton && (
            <button onClick={props.onHide}>
              <Image
                src={closeIcon}
                width={36}
                height={36}
                alt="Close modal icon"
              />
            </button>
          )}
        </div>
        <div className="h-0.5 bg-black" />
        <div className="modal__body my-3">{props.children}</div>
        <div className="h-0.5 bg-black" />
        <div className="modal__footer my-2">{props.Footer}</div>
      </div>
    </div>
  ) : null;
}

Modal.defaultProps = {
  closeButton: true,
};

interface ModalProps {
  show: boolean;
  title: string;
  Footer: ReactNode;
  children: ReactNode;
  closeButton?: boolean;
  onHide: () => void;
}

export default Modal;
