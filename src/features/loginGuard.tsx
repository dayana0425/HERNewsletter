import { FC, ReactNode, useEffect } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

const LoginGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const handleSwitchNetwork = (chainId: number) => {
    switchNetwork?.(chainId);
  };

  useEffect(() => {
    if (isConnected && chain?.id !== 134) {
      handleSwitchNetwork(chains[0]?.id);
    }
  }, [isConnected, chain]);

  return (
    <>
      {children}
    </>
  );
};

export default LoginGuard;


