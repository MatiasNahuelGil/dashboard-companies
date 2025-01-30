import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

// Middleware de autenticación para asegurarse de que solo los usuarios autenticados puedan cargar archivos
const handleAuth = () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

// Configuración del router de Uploadthing
export const ourFileRouter = {
  profileImage: f({
    image: {
      maxFileSize: "4MB", 
      maxFileCount: 1,    
    },
  })
    .middleware(() => handleAuth()) 
    .onUploadComplete(({ metadata, file }) => {
      
      console.log("Upload complete:", file.url);
      console.log("Metadata:", metadata);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
