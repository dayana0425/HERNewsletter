import { FC, ReactNode, useEffect } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

const LoginGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const handleSwitchNetwork = async (chainId: number) => {
    await switchNetwork?.(chainId);
  };

  useEffect(() => {
    if (isConnected && chain?.id !== 134) {
      if (address) {
        handleSwitchNetwork(chains[0]?.id);
      }
    }
  }, [isConnected, address, chain]);

  return <>{children}</>;
};

export default LoginGuard;
