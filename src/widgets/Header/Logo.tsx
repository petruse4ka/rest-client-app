import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <img src="./logo.png" alt="Logo company" className="w-10" />
    </Link>
  );
}
