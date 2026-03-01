// @ts-nocheck
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useProfile() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [profile, setProfile] = useState<any>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    useEffect(() => {
        if (isSignedIn && user?.id) {
            setIsLoadingProfile(true);
            fetch('/api/profile')
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setProfile(data);
                    }
                })
                .finally(() => {
                    setIsLoadingProfile(false);
                });
        } else if (isLoaded && !isSignedIn) {
            setProfile(null);
        }
    }, [user?.id, isSignedIn, isLoaded]);

    return {
        clerkUser: user,
        profile,
        isLoading: !isLoaded || isLoadingProfile,
        isSignedIn,
    };
}
