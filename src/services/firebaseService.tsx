import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getCollectionRef = (collectionName: string) => {
    return collection(db, collectionName);
}