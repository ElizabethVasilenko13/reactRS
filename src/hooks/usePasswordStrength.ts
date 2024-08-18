import { passwordStrengthRegex } from '@validation/form.validator';
import { useState, useEffect } from 'react';

export const usePasswordStrength = (password: string) => {
  const [strength, setStrength] = useState<number>(0);
  useEffect(() => {
    const calculateStrength = (password: string): number => {
      let score = 0;
      if (passwordStrengthRegex.lowercase.test(password)) score += 25;
      if (passwordStrengthRegex.uppercase.test(password)) score += 25;
      if (passwordStrengthRegex.number.test(password)) score += 25;
      if (passwordStrengthRegex.special.test(password)) score += 25;
      return score;
    };

    setStrength(calculateStrength(password));
  }, [password]);

  return strength;
};
