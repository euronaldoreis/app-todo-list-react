import { collection, addDoc, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebaseAPI';
import { Tasks } from '../interfaces/tasks.interface';
import { Users } from '../interfaces/users.interface';

const COLLECTION_TASK_NAME = 'tasks'
const COLLECTION_USERS_NAME = 'users'

export const findAllTasks = () => {
  return query(collection(db, COLLECTION_TASK_NAME))
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

export const updateTask = async (taskId: string, body: any) => {
  return await updateDoc(doc(db, COLLECTION_TASK_NAME, taskId), body)
}

export const deleteTask = async (taskId: any) => {
  return await deleteDoc(doc(db, COLLECTION_TASK_NAME, taskId))
}