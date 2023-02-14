function ConnectWalletButton(props: ConnectWalletButtonProps) {
  return (
    <button
      className={`bg-gray-900 text-base py-2 px-4 mt-0 rounded-md text-white font-bold hover:opacity-75 active:opacity-50 ${props.className}`}
    >
      Connect Wallet
    </button>
  );
}

ConnectWalletButton.defaultProps = {
  className: '',
};

interface ConnectWalletButtonProps {
  className?: string;
}

export default ConnectWalletButton;
