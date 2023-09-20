import { useRouter } from 'next/router';

import Profile from '@/components/Profile/Profile';

export default function ProfilePage() {
  const router = useRouter();
  console.log(router.query.slug);
  console.table(router.query.slug);
  return <Profile id={router.query.slug as string} />;
}
