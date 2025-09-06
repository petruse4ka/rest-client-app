'use client';

import { useTranslations } from 'next-intl';

export function SignUpForm() {
  const t = useTranslations('SignUpForm');
  console.log(t);
  return (
    <div>
      <div> форма</div>
    </div>
  );
}
