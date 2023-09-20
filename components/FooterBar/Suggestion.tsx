import { collection, getDocs } from 'firebase/firestore';

import { memo, useEffect, useState } from 'react';

import Miniprofile from '@/components/Miniprofile/Miniprofile';
import { firestore } from '@/lib/firebase';

import MiniprofileSkeleton from '../Miniprofile/MiniprofileSkeleton';

type User = {
  userId: string;
  email: string;
  image: string;
  name: string;
};

type UserDoc = User & {
  userId: string;
};

function Suggestion() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchRandomUsersFromFirestore = async () => {
      try {
        const usersCollection = collection(firestore, 'users');
        const querySnapshot = await getDocs(usersCollection);

        const allUsers: UserDoc[] = [];
        querySnapshot.forEach((doc) => {
          const userId = doc.id;
          const userData = doc.data() as User;
          allUsers.push({ ...userData, userId });
        });

        const randomUsers: User[] = [];
        while (randomUsers.length < 5 && allUsers.length > 0) {
          const randomIndex = Math.floor(Math.random() * allUsers.length);
          const randomUser = allUsers.splice(randomIndex, 1)[0];
          randomUsers.push(randomUser);
        }
        setUsers(randomUsers);
      } catch (error) {
        console.error('Firestore 데이터를 가져오는 중 에러 발생:', error);
      }
    };
    fetchRandomUsersFromFirestore();
  }, [firestore]);

  return (
    <div>
      {users ? (
        users.map((user, key) => (
          <Miniprofile
            key={key}
            email={user.email || '@kakao'}
            name={user.name}
            img={user.image}
            userId={user.userId}
            type='onSidebar'
          />
        ))
      ) : (
        <>
          {[...Array(5)].map((_, key) => (
            <MiniprofileSkeleton key={key} type='onSidebar' />
          ))}
        </>
      )}
    </div>
  );
}

export default memo(Suggestion);
