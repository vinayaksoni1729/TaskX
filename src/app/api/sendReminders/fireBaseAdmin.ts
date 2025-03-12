import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "taskx-f8b52",
        clientEmail: "firebase-adminsdk-fbsvc@taskx-f8b52.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCio4iMFNUFAXm/\nLjB9hczO9yfn/nGVNf5tYZ858J11lqkG4U4IKpNaYQs6ezFGVVmfVNNWU4jKu4AN\nP670uN9EuXk0AUuV1JTnCbPcrz3wQKDrnLqbIS1h5ZHK7kL3Kupfa3g2leLd2U/5\nzh6LVT/g4aotVzWYdLjozM/a9JHfF5APlN3ExR/VtYfRQZKW4qQ6RZswy1NEfKMA\nRCOR9ekEMU57JgkKXhJnzHpQnkMLH5xhAfHxK+Uth5HhKC/74/nh4cSpKpoRO5QU\nULXQpMyJmsKM/fLDBT5WLl5FXQkBhe5VxsvsNphwhh65DXDvNy7HC/rgFv/Mbjsa\nBEnup5UpAgMBAAECggEADd3jGcx56CIa0wfZZw5mKrxMeP2LCiWPIpzY8lv3VOwK\nT9WcbVpR83oENtGDn0NOL6VQGpNnPZ/UeGy2WlO755Rnxt0YaHc2VeeQIBAJ+CbO\ngaA8kdb3k1n7PwHnEENmtcmIN6E6dV9esAYYuRkE6APdml2N6oiDLogt7bV+DXcG\nJhRSEPIMhjhEiQ+a6+D0N7eV131QUIHAV+WP/Gdm8ynPDqUMwIIZec8IAqNBLgf/\niV3nxtmaM4FY4tdvcDcayio1m+++g893PpA5hWGRUNXDjbesvXedb5ko8rL0SSdm\nZEGOCr3RH6UvScNcnYFnHAylpGee7LolfUJ9srrFYQKBgQDfyobJ6udDEYNRjqub\ng8xBALRHxNTk5hmrTwTmJuNyXKgBG3JOHcDPz3TErNfI8NRfo1KnmunLA2w91yoC\np/n+7SKH1R8ciI7M86kdOdIjELc++P5QyVto1dvg/Qql2u9OeMfw+6c0VqOV0Erp\nKYNrTT9VPVWpOOQinKDZ4CeDsQKBgQC6C+FAucHBrX49qsAGDoAQ17GrD7scPjLq\nPTEWrwI6nI1KGaiCpmMw5Fk6zaYpxtuG5d3gjQ7SbOzME2p7LsGm38OWwWe0q0zU\nC8DTE/YOXyYWahopSClorpoYZ8oXAIfqefs70uPm7Rk6mmkDrwXwJaknp6sRli6V\nLaNCXpXe+QKBgD6Ozr8C+0K0UpEp4K7IWQCSwdKOIzUZXXOV0zjDBjGh1RT6JynP\nB2cQBwQzjN6O888ISMKxe0lU250t2ICFlEy+3Tg7S0cepUyFkHCrCSLkOVVRJUZQ\nA016+swZ8DAM03iMKtgigMsQrQnkAAzNnf8QyPN7AcccMCm8vvoovuMBAoGAdvoX\n8CObBDfmLpuet4DYZ2z44vNpblNcji3Z0a7T1xW8yXGFMSAk+ORfJ9rR84+HXkps\nTSkIHIuqF4wnIWWyU/xvgV5n6sNNm6F0i8gNJ/2zRsxNtK7ARIC8bPUa6QDe6pVd\nlFF2i3x/ENokZEWun3gGKCTyoomPerk32b7RS0kCgYB57mJKoNw36X3xiIo0XixD\nqJU4AWY/jJXEh9QNhrudhAOYrVBxZowNJOiWqW+3eOkPHEWTnXPC8lmLIx76LxIt\nbGy4xYaXNTv0SHR1ZKi9ecd21uqwvmd111M+vn8vp8nh2mrLKh22kT6jTujRgA+3\nWry8ugvu2NJTUkh2W4CeDQ==\n-----END PRIVATE KEY-----\n",
      }),
    });
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

export const db = admin.firestore();