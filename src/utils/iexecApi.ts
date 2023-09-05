import { getAccount } from '@wagmi/core';
import { IExecDataProtector, DataSchema } from '@iexec/dataprotector';
import { IExecWeb3mail } from '@iexec/web3mail';

const protectDataFunc = async (data: DataSchema, name: string) => {
  const result = getAccount();
  const provider = await result.connector?.getProvider();

  const dataProtector = new IExecDataProtector(provider);
  const { address } = await dataProtector.protectData({ data, name });
  console.log('Data Protected!', address);
  return address;
};

const revokeAccessFunc = async (
  protectedData: string,
  authorizedUser: string
) => {
  const result = getAccount();
  const provider = await result.connector?.getProvider();

  const dataProtector = new IExecDataProtector(provider);
  const grantedAccess = await dataProtector.fetchGrantedAccess({
    protectedData,
    authorizedUser,
  });
  console.log('Fetched granted access', grantedAccess);
  const { txHash } = await dataProtector.revokeOneAccess(grantedAccess[0]);
  console.log('Access Revoked!', txHash);
  return txHash;
};

const grantAccessFunc = async (
  protectedData: string,
  authorizedUser: string,
  pricePerAccess: number,
  numberOfAccess: number
) => {
  const result = getAccount();
  const provider = await result.connector?.getProvider();
  const dataProtector = new IExecDataProtector(provider);
  const grantedAccess = await dataProtector.grantAccess({
    protectedData: protectedData,
    authorizedApp: 'web3mail.apps.iexec.eth',
    authorizedUser: authorizedUser,
    numberOfAccess: numberOfAccess,
    pricePerAccess: pricePerAccess,
  });
  console.log('Access Granted!', grantedAccess);
  return grantedAccess;
};

const sendWeb3Email = async (
  protectedData: string,
  emailSubject: string,
  emailBody: string
) => {
  const result = getAccount();
  const provider = await result.connector?.getProvider();
  const web3mail = new IExecWeb3mail(provider);
  const taskId = await web3mail.sendEmail({
    protectedData: protectedData,
    emailSubject: emailSubject,
    emailContent: emailBody,
  });
  console.log('Email Sent!', taskId);
  return taskId;
};

export { protectDataFunc, revokeAccessFunc, grantAccessFunc, sendWeb3Email };
