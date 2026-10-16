import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Fetch all jobs from Firestore with automatic seeding & fallback to local /jobs.json
 */
export async function fetchJobs() {
  try {
    const jobsRef = collection(db, 'jobs');
    const snapshot = await getDocs(jobsRef);

    if (!snapshot.empty) {
      const cloudJobs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));
      return cloudJobs;
    }

    // If Firestore 'jobs' collection is empty, load from /jobs.json and auto-seed to Firestore
    const localRes = await fetch('/jobs.json');
    if (!localRes.ok) {
      throw new Error(`Failed to load jobs (Status: ${localRes.status})`);
    }
    const initialJobs = await localRes.json();

    // Auto-seed into Firestore asynchronously
    Promise.all(
      initialJobs.map((job) =>
        setDoc(doc(db, 'jobs', job.id), job).catch((e) =>
          console.warn('Seeding job to Firestore skipped:', e.message)
        )
      )
    ).catch(() => {});

    return initialJobs;
  } catch (error) {
    console.warn('Firestore fetch failed, falling back to local jobs.json:', error.message);
    const localRes = await fetch('/jobs.json');
    if (!localRes.ok) {
      throw new Error(`Failed to load jobs (Status: ${localRes.status})`);
    }
    return await localRes.json();
  }
}

/**
 * Fetch a single job by its ID
 */
export async function fetchJobById(id) {
  try {
    const docRef = doc(db, 'jobs', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.warn('Firestore single job fetch error:', error.message);
  }

  // Fallback to local /jobs.json
  const res = await fetch('/jobs.json');
  if (!res.ok) {
    throw new Error(`Failed to fetch job details (Status: ${res.status})`);
  }
  const jobs = await res.json();
  const found = jobs.find((j) => String(j.id) === String(id));
  if (!found) {
    throw new Error(`Job with ID "${id}" was not found.`);
  }
  return found;
}

/**
 * Submit candidate job application to Firebase Firestore and localStorage
 */
export async function submitApplication(job, applicationData) {
  const applicationRecord = {
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    fullName: applicationData.fullName,
    email: applicationData.email,
    phone: applicationData.phone,
    experienceYears: applicationData.experienceYears,
    portfolio: applicationData.portfolio || '',
    coverNote: applicationData.coverNote,
    createdAt: new Date().toISOString()
  };

  // 1. Save to localStorage backup
  try {
    const existing = JSON.parse(localStorage.getItem('jobnest_applications') || '[]');
    existing.unshift(applicationRecord);
    localStorage.setItem('jobnest_applications', JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }

  // 2. Save to Firebase Firestore 'applications' collection
  try {
    const docRef = await addDoc(collection(db, 'applications'), {
      ...applicationRecord,
      timestamp: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.warn('Firestore application write warning (saved locally):', err.message);
    return { success: true, localOnly: true };
  }
}

/**
 * Submit contact inquiry to Firebase Firestore and localStorage
 */
export async function submitContactInquiry(inquiryData) {
  const contactRecord = {
    name: inquiryData.name,
    email: inquiryData.email,
    category: inquiryData.category,
    subject: inquiryData.subject,
    message: inquiryData.message,
    createdAt: new Date().toISOString()
  };

  // 1. Save to localStorage backup
  try {
    const existing = JSON.parse(localStorage.getItem('jobnest_contacts') || '[]');
    existing.unshift(contactRecord);
    localStorage.setItem('jobnest_contacts', JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }

  // 2. Save to Firebase Firestore 'contacts' collection
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...contactRecord,
      timestamp: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.warn('Firestore contact write warning (saved locally):', err.message);
    return { success: true, localOnly: true };
  }
}
