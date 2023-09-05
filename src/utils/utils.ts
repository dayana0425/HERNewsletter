import { supabase } from '../config/client';
import { User } from './types';

export const checkUserInDatabase = async (userAddress: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('subscribed_users')
      .select('*')
      .eq('user_id', userAddress)
      .single();

    if (error) {
      console.error('Error checking user:', error);
      return false;
    }

    return data ? true : false;
  } catch (e) {
    console.error('Exception checking user:', e);
    return false;
  }
};

export const getUserData = async (userAddress: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('subscribed_users')
        .select('*')
        .eq('user_id', userAddress)
        .single();
  
      if (error) {
        console.error('Error checking user:', error);
        return null;
      }
  
      return data ? data : null;
    } catch (e) {
      console.error('Exception checking user:', e);
      return null;
    }
  };
