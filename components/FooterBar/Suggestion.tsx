import { collection, doc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';

import { memo, useEffect, useState } from 'react';

import Miniprofile from '@/components/Miniprofile/Miniprofile';
import { firestore } from '@/lib/firebase';

type User = {
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
    // Firestore에서 랜덤한 5명의 사용자 데이터를 가져오는 함수를 정의합니다.
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

    fetchRandomUsersFromFirestore(); // 데이터를 가져오는 함수를 호출합니다.
  }, []);

  return (
    <div>
      {users.map((user, key) => (
        <Miniprofile
          key={key}
          email={user.email}
          name={user.name}
          img={user.image}
          type='onSidebar'
        />
      ))}
    </div>
  );
}

export default memo(Suggestion);
