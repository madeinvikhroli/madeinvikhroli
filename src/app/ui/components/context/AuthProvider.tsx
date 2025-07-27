"use client";
import { createContext, useState, useEffect } from "react";
import { client } from "../../../api/client";
import axios from "axios";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userDetails: any;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userDetails: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.auth.getSession().then(({ data }: any) => {
      setUser(data?.session?.user || null);
      setLoading(false);
    });
    const { data: litener } = client.auth.onAuthStateChange(
      (e: any, session: any) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      litener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.post("/api/members/getMemberByID", {
          id: user?.id,
        });
        setUserDetails(res?.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
