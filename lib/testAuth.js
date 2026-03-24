#!/usr/bin/env node

// Test Firebase Auth login
// Run with: node lib/testAuth.js

const { initializeApp } = require('firebase/app');
const {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCUW9nLH478SaJYK5tiQ9lfs1SowMGPVIs",
  authDomain: "bunspos.firebaseapp.com",
  projectId: "bunspos",
  storageBucket: "bunspos.firebasestorage.app",
  messagingSenderId: "593049973722",
  appId: "1:593049973722:web:25887470ce1e05d572c6e3",
  measurementId: "G-JRQ1D4J147",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testLogin(email, password) {
  try {
    console.log(`Testing login for ${email}...`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`✅ Login successful for ${email}`);
    console.log(`User ID: ${userCredential.user.uid}`);
    console.log(`Email verified: ${userCredential.user.emailVerified}`);

    // Sign out
    await signOut(auth);
    console.log(`✅ Signed out ${email}`);
    return true;
  } catch (error) {
    console.error(`❌ Login failed for ${email}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Testing Firebase Auth staff login...\n');

  const testCredentials = [
    { email: "manager@buns.com", password: "manager123" },
    { email: "chef@buns.com", password: "chef123" },
    { email: "server1@buns.com", password: "server123" },
  ];

  let successCount = 0;
  for (const cred of testCredentials) {
    const success = await testLogin(cred.email, cred.password);
    if (success) successCount++;
    console.log(''); // Empty line between tests
  }

  console.log(`🎉 Auth test complete! ${successCount}/${testCredentials.length} logins successful.`);
}

main().catch(console.error);