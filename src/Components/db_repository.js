import { firebaseConfig } from '../assets/firebase-auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, getDocs, query, where, doc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
const dbRef = collection(db, "attendees");

export const RESPONSE_CODES = {
    SUCCESS: 200,
    FAILURE: 400,
    CONFLICT: 409,
}

export const getAttendeesByNameAndMobile = async (name, mobile) => {
    const q = query(dbRef, where("name", "==", name));
    console.log(q);
    const obj = await getDocs(q);
    const data = obj.docs.map(elem => ({ ...elem.data() }));
    console.log("Query Snapshot: ", data[0]);
    if (data[0] === undefined) {
        console.log("Data is undefined: ", data[0]);
        return undefined;
    }
    return {...data[0]};
}

export const getAttendeesByNameAndMobileReturnID = async (name, mobile) => {
    const q = query(dbRef, where("name", "==", name));

    return await getDocs(q).then((obj) => {
        const data = obj.docs.map(elem => ({ id: elem.id, ...elem.data() }))
        console.log("Query Snapshot: ", data[0]);
        return data[0].id;
    })
}

export const setAttendee = async (data) => {
    try {
        const attendeeId = await getAttendeesByNameAndMobileReturnID(data.name, data.mobile);
        await setDoc(doc(db, "attendees", attendeeId), data);
        return {'code': RESPONSE_CODES.SUCCESS};
    } catch (e) {
        console.error("Error updating attendee: ", e);
        return {'code': RESPONSE_CODES.FAILURE};
    }
}

export const postAttendee = async (data) => {
    console.log("Data: ", data);
    try {
        const record = await getAttendeesByNameAndMobile(data.name, data.mobile);
        console.log("snapshot received: ", record);
        if (record !== undefined) {
            console.log("Record already exists: ", record);
            console.log("Response to be sent: ", RESPONSE_CODES.CONFLICT);
            return {'code': RESPONSE_CODES.CONFLICT, 'name': record.name, 'mobile': record.mobile};
        }
        console.log("Proceeding with attendee: ", data);
        const docRef = await addDoc(dbRef, data);
        if (docRef !== undefined) {
            console.log("Document written with ID: ", docRef.id);
            return {'code': RESPONSE_CODES.SUCCESS};
        }
    } catch (e) {
        console.error("Error adding attendee: ", e);
        return {'code': RESPONSE_CODES.FAILURE};
    }
}