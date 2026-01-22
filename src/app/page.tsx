import { redirect } from 'next/navigation';

// Root page redirects to v1 login for initial demo
export default function Home() {
  redirect('/v1/login');
}
