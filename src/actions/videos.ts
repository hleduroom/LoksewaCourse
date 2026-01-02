"use server";

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const UPLOAD_FOLDER = "chapters";

interface UploadSignatureSuccess {
  success: true;
  data: {
    signature: string;
    timestamp: string;
    cloudName: string;
    folder: string;
    apiKey: string;
    uploadUrl: string;
  };
}

interface UploadSignatureError {
  success: false;
  error: string;
}

export async function getUploadSignature(): Promise<
  UploadSignatureSuccess | UploadSignatureError
> {
  try {
    const timestamp = String(Math.floor(Date.now() / 1000));

    const uploadParams = {
      timestamp: timestamp,
      folder: UPLOAD_FOLDER,
    };
    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET!
    );
    return {
      success: true,
      data: {
        signature,
        folder: UPLOAD_FOLDER,
        timestamp,
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        apiKey: process.env.CLOUDINARY_API_KEY!,
        uploadUrl: process.env.CLOUDINARY_UPLOAD_URL!,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Failed to generate upload signature",
    };
  }
}

export async function generateSignedPlaybackUrl(
  publicId: string,
  expireSeconds = 300
) {
  try {
    const timestamp = Math.floor(Date.now() / 1000) + expireSeconds;

    // FIXED: Changed from cloudinary.url.url() to cloudinary.url()
    const url = cloudinary.url(publicId, {
      resource_type: "video",
      sign_url: true,
      type: "authenticated", // optional, for added security if you enabled authenticated delivery
      expires_at: timestamp,
      // any other options like format, transformation etc
    });

    return { success: true, url };
  } catch (err) {
    console.error("Error generating signed playback URL:", err);
    return { success: false, error: "Failed to generate signed URL" };
  }
}

// async function uploadVideo(file: File) {
//     const { timestamp, signature } = await getSignature()
//
//     const formData = new FormData()
//     formData.append("file", file)
//     formData.append("api_key", process.env.CLOUDINARY_API_KEY!)
//     formData.append("signature", signature)
//     formData.append("timestamp", timestamp)
//     formData.append("folder", "chapters")
//
//     const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/<your-cloud-name>/video/upload"
//
//     const response = await fetch(CLOUDINARY_UPLOAD_URL, {
//         method: "POST",
//         body: formData
//     })
//
//     const data = await response.json()
//     console.log(data)