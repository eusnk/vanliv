import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'vanliv.firebaseapp.com',
  projectId: 'vanliv',
  storageBucket: 'vanliv.appspot.com',
  messagingSenderId: '599786397122',
  appId: '1:599786397122:web:acaf098779ab21d2420a5b',
}

const app = initializeApp(firebaseConfig)
const database = getFirestore(app)
const auth = getAuth(app)
const vansCollectionRef = collection(database, 'vans')

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef)
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return vans
}

export async function getVanDetails(id) {
  const docRef = doc(database, 'vans', id)
  const snapshot = await getDoc(docRef)
  return {
    ...snapshot.data(),
    id: snapshot.id,
  }
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', auth.currentUser.uid))
  const snapshot = await getDocs(q)
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return vans
}

export async function submitNewVan(data) {
  const user = auth.currentUser.uid
  try {
    await addDoc(collection(database, 'vans'), {
      description: data.description,
      hostId: user,
      imageUrl: data.imageUrl,
      name: data.name,
      price: data.price,
      type: data.type,
    })
  } catch (e) {
    console.error('error writing document: ', e)
  }
}

export async function deleteVan(id) {
  await deleteDoc(doc(database, 'vans', id))
  location.reload()
}
