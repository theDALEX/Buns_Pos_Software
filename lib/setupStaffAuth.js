#!/usr/bin/env node

// Firebase Auth setup script for staff accounts
// Run with: node lib/setupStaffAuth.js

const { initializeApp } = require('firebase/app');
const {
  getAuth,
  createUserWithEmailAndPassword,
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

// Mock staff accounts
const staffAccounts = [
  {
    email: "manager@buns.com",
    password: "manager123",
    role: "manager"
  },
  {
    email: "chef@buns.com",
    password: "chef123",
    role: "chef"
  },
  {
    email: "server1@buns.com",
    password: "server123",
    role: "server"
  },
  {
    email: "server2@buns.com",
    password: "server456",
    role: "server"
  }
];

async function createStaffAccounts() {
  console.log('Creating staff accounts in Firebase Auth...');

  for (const staff of staffAccounts) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        staff.email,
        staff.password
      );
      console.log(`✅ Created account: ${staff.email} (${staff.role})`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  Account already exists: ${staff.email}`);
      } else {
        console.error(`❌ Error creating ${staff.email}:`, error.message);
      }
    }
  }

  // Sign out to clean up
  await signOut(auth);
  console.log('\n🎉 Staff account setup complete!');
  console.log('\n📋 Mock Login Credentials:');
  console.log('========================');
  staffAccounts.forEach(staff => {
    console.log(`Email: ${staff.email}`);
    console.log(`Password: ${staff.password}`);
    console.log(`Role: ${staff.role}`);
    console.log('---');
  });
}

createStaffAccounts().catch(console.error);