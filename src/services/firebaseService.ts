import { collection, getDocs, addDoc, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebaseAPI';
import { Tasks } from '../interfaces/tasks.interface';
import { Users } from '../interfaces/users.interface';

const COLLECTION_LIST_NAME = 'todolist'
const COLLECTION_TASK_NAME = 'tasks'
const COLLECTION_USERS_NAME = 'users'

export const findAllLists = (user: Users) => {
  return query(collection(db, COLLECTION_LIST_NAME), where('users', 'array-contains', user))
}

// export const findAllListsUsers = (id: string) => {
//   return query(doc(db, COLLECTION_LIST_NAME, id))
// }

export const findAllTasks = () => {
  return query(collection(db, COLLECTION_TASK_NAME))
}

export const createList = async (body: any) => {
  return await addDoc(collection(db, COLLECTION_LIST_NAME), body)
}

export const createTask = async (body: any) => {
  return await addDoc(collection(db, COLLECTION_TASK_NAME), body)
}

export const getUser = (email: string) => {
  return query(collection(db, COLLECTION_USERS_NAME), where('email', '==', email))
}

export const createUser = async (body: any) => {
  return await addDoc(collection(db, COLLECTION_USERS_NAME), body)
}

export const addUsersToList = async (listId: string, body: any) => {
  return await updateDoc(doc(db, COLLECTION_LIST_NAME, listId), body)
}

export const updateList = async (listId: string, body: any) => {
  return await updateDoc(doc(db, COLLECTION_LIST_NAME, listId), body)
}

export const updateTask = async (listId: string, taskId: string, body: any) => {
  return await updateDoc(doc(db, COLLECTION_LIST_NAME, listId, COLLECTION_TASK_NAME, taskId), body)
}

export const deleteList = async (listId: string) => {
  return await deleteDoc(doc(db, COLLECTION_LIST_NAME, listId))
}

export const deleteTask = async (listId: string, taskId: string) => {
  return await deleteDoc(doc(db, COLLECTION_LIST_NAME, listId, COLLECTION_TASK_NAME, taskId))
}