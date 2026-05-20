import { redirect } from 'next/navigation';

export default function RootRedirect() {
  redirect('/en');
  return null; // This will never render
}
