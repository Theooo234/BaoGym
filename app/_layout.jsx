// import { Slot } from "expo-router";
// import colors from "../config/color";

// export default function AppLayout() {
//   console.log("AppLayout rendered", colors.primary);
//   return <Slot />;
// }

import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (session && inAuthGroup) {
      // Redirect to app if signed in and on auth page
      router.replace('/home');
    } else if (!session && !inAuthGroup) {
      // Redirect to login if not signed in and not on auth page
      router.replace('/auth/login');
    }
  }, [session, segments, loading]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}
