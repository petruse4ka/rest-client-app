import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ size }: { size: number }) {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="Logo company" width={size} height={size} />
    </Link>
  );
}
