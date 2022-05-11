import crypto from 'crypto';
import { LENGTH, ENCODING, ITERATIONS, HASH_DIGEST } from '../config/crypto';

/**
 *
 * @param {string} pwd
 * @returns {salt, password}
 */
export const cryptoPassword = (pwd) => {
  const salt = crypto.randomBytes(LENGTH).toString(ENCODING);
  const encryptedPassword = crypto
    .pbkdf2Sync(pwd, salt, ITERATIONS, LENGTH, HASH_DIGEST)
    .toString(ENCODING);
  return { salt, encryptedPassword };
};

export const decryptoPassword = ({ password, salt }) => {
  const decryptedPassword = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, LENGTH, HASH_DIGEST)
    .toString(ENCODING);
  return decryptedPassword;
};
