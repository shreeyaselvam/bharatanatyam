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
    const q = query(dbRef, where("name", "==", name), where("mobile", "==", mobile));

    return await getDocs(q).then((obj) => {
        const data = obj.docs.map(elem => ({ ...elem.data() }))
        console.log("Query Snapshot: ", data[0]);
        return {...data[0]};
    })
}

export const getAttendeesByNameAndMobileReturnID = async (name, mobile) => {
    const q = query(dbRef, where("name", "==", name), where("mobile", "==", mobile));

    return await getDocs(q).then((obj) => {
        const data = obj.docs.map(elem => ({ id: elem.id, ...elem.data() }))
        console.log("Query Snapshot: ", data[0]);
        return data[0].id;
    })
}

export const setAttendee = async (data) => {
    try {
        getAttendeesByNameAndMobileReturnID(data.name, data.mobile)
                    .then(async (id) => {
                        await setDoc(doc(db, "attendees", id), data);
                        return RESPONSE_CODES.SUCCESS;
                    })
                    .catch(error => {
                        console.error("Error fetching attendees before updating attendee: ", error);
                    });
    } catch (e) {
        console.error("Error updating attendee: ", e);
        return RESPONSE_CODES.FAILURE;
    }
}

export const postAttendee = async (data) => {
    try {
        getAttendeesByNameAndMobile(data.name, data.mobile)
                    .then(record => {
                        console.log("snapshot: ", record);
                        if (record !== undefined) {
                            console.log("Record already exists: ", record);
                            return RESPONSE_CODES.CONFLICT;
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching attendees before submitting new attending: ", error);
                    });
        await addDoc(dbRef, data)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                return RESPONSE_CODES.SUCCESS;
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    } catch (e) {
        console.error("Error adding attendee: ", e);
        return RESPONSE_CODES.FAILURE;
    }
}