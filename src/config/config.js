const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwritePId: String(import.meta.env.VITE_PROJECT_ID),
    appwriteDbId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCId: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBId: String(import.meta.env.VITE_BUCKET_ID),
};

export default config;