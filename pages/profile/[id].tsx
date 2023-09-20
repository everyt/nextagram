import { useRouter } from 'next/router';

import Profile from '@/components/Profile/Profile';

export default function ProfilePage() {
  const router = useRouter();
  return <Profile id={router.query.id as string} />;
}
