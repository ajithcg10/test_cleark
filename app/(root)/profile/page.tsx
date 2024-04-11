import ProfilePage from "@/app/component/ProfilePage";
import { auth } from "@clerk/nextjs";

import React, { useEffect, useState } from "react";

const Profile = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as String;
  return (
    <div className="wrapper">
      <ProfilePage />
    </div>
  );
};

export default Profile;
