import { FC, ReactNode, useEffect } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { Box } from '@mui/material';

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


// import { FC, ReactNode } from 'react';
// import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
// import { Box } from '@mui/material';

// /* 
// This component is used to switch the network to the right one.
// */

// const LoginGuard: FC<{ children: ReactNode }> = ({ children }) => {
//   const { isConnected } = useAccount();
//   const { chain } = useNetwork();
//   const { chains, error, isLoading, pendingChainId, switchNetwork } =
//     useSwitchNetwork();

//   const handleSwitchNetwork = (chainId: number) => {
//     switchNetwork?.(chainId);
//   };

//   return (
//     <>
//       {children}
//       {isConnected && chain?.id !== 134 && (
//         <Box sx={{ margin: '3rem auto' }}>
//           <p>Oops, you're on the wrong network</p>
//           <p> Click on the following button to switch to the right network </p>
//           <button
//             className="switch-network-button"
//             disabled={!switchNetwork || chain?.id === chains[0]?.id}
//             key={chains[0]?.id}
//             onClick={() => handleSwitchNetwork(chains[0]?.id)}
//           >
//             Switch to {chains[0].name}
//             {isLoading && pendingChainId === chains[0]?.id && ' (switching)'}
//           </button>
//           <div>{error && error.message}</div>
//         </Box>
//       )}
//     </>
//   );
// };

// export default LoginGuard;
