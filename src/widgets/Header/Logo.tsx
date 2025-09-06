import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="Logo company" width={40} height={40} />
    </Link>
  );
}
