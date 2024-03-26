import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// Firestore 인스턴스 초기화
const db = getFirestore();

// complaint 컬렉션에서 displayName이 "홍홍홍"인 문서를 찾아서 삭제
async function deleteComplaintsByDisplayName(displayName) {
  const complaintsRef = collection(db, 'complaint');
  const q = query(complaintsRef, where('displayName', '==', displayName));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (document) => {
    await deleteDoc(doc(db, 'complaint', document.id));
    console.log(`Deleted document with ID: ${document.id}`);
  });
}

// 함수 실행
deleteComplaintsByDisplayName('홍홍홍');
