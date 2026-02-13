const login = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        "https://smart-bookmark-61go0t1hx-shivams-projects-a57c6754.vercel.app/",
    },
  });
};
