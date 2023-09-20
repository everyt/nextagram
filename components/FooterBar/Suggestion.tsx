import { collection, doc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';

import { memo, useEffect, useState } from 'react';

import Miniprofile from '@/components/Miniprofile/Miniprofile';
import { firestore } from '@/lib/firebase';

type User = {
  email: string;
  image: string;
  name: string;
};

function Suggestion() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Firestore에서 랜덤한 5명의 사용자 데이터를 가져오는 함수를 정의합니다.
    const fetchRandomUsersFromFirestore = async () => {
      try {
        const usersCollection = collection(firestore, 'users'); // 'users'는 Firestore에서 사용자 데이터를 저장한 컬렉션 이름입니다.

        // Firestore 컬렉션의 문서 수를 가져옵니다.
        const querySnapshot = await getDocs(usersCollection);
        const totalUsers = querySnapshot.size;

        // 'randomOrder' 필드 값을 업데이트하는 async 함수를 정의합니다.
        const updateRandomOrder = async (docRef: any, randomOrder: number) => {
          await setDoc(docRef, { randomOrder });
        };

        // 'randomOrder' 필드를 랜덤으로 설정합니다.
        const randomIndexes: number[] = [];
        while (randomIndexes.length < totalUsers) {
          randomIndexes.push(randomIndexes.length);
        }
        randomIndexes.sort(() => Math.random() - 0.5); // 랜덤 순서로 정렬

        // 'randomOrder' 필드 값을 갱신합니다.
        for (let i = 0; i < totalUsers; i++) {
          const docRef = doc(usersCollection, randomIndexes[i].toString());
          await updateRandomOrder(docRef, i);
        }

        // 'randomOrder' 필드를 기준으로 랜덤한 순서로 데이터를 가져옵니다.
        const querySnapshotRandom = await getDocs(
          query(usersCollection, orderBy('randomOrder'), limit(5)),
        );
        console.log('Query Snapshot Random:', querySnapshotRandom);

        const randomUsersData: User[] = [];

        querySnapshotRandom.forEach((doc) => {
          randomUsersData.push(doc.data() as User);
        });

        setUsers(randomUsersData); // 랜덤하게 가져온 사용자 데이터를 상태에 저장합니다.
      } catch (error) {
        console.error('Firestore 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchRandomUsersFromFirestore(); // 데이터를 가져오는 함수를 호출합니다.
  }, []);

  return (
    <div>
      {users.map((user, i) => (
        <Miniprofile
          key={i}
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
