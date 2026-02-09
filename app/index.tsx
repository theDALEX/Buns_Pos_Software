import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { auth, db } from "../lib/firebase";

export default function Index() {
  useEffect(() => {
    //Detect auth state
    if (!auth) {
      console.error("Auth not initialized");
      return;
    }
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
      } else {
        console.log("No user is signed in.");
      }
    });

    // Write example (run once)
    (async () => {
      await setDoc(doc(db, "categories", "Burgers"), {
        title: "Chicken Burger",
        ingredients: ["Bread", "Chicken Patty", "Lettuce", "Tomato", "Cheese"],
      });
    })().catch(console.error);

    // Read/listen example
    const unsubDoc = onSnapshot(doc(db, "categories", "Burgers"), (snap) => {
      console.log("Latest data:", snap.data());
    });

    return () => {
      unsubAuth();
      unsubDoc();
    };
  }, []);

  return (
    <View>
      <Text>POS Software</Text>
    </View>
  );
}
