'use client'
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { storage } from "../../firebase/config";
import { Button } from "@/components/ui/button";
import Replicate from "replicate";

export function PageContent() {

  const replicate = new Replicate({
  auth: 'r8_5M3I56ncdfcVv8qd23MfZoC4HyuVZ3Z4W0oYD',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function uploadImage(image : File) {
    const filePath = `${image.name}`;
    const newImageRef = ref(storage, filePath);
    await uploadBytesResumable(newImageRef, image);
  
    return await getDownloadURL(newImageRef);
  }
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedImage) {
      console.log('Image Found... Uploading');
      const fileUrl = await uploadImage(selectedImage);
      // Do something with the fileUrl
      console.log(fileUrl);
      console.log('Image Uploaded... Running Replicate');
      console.log('Attempt #4');
      
    //   const replicate = new Replicate({
    //     // baseUrl: "https://bg-remover-ai.web.app/",
    //     auth: "r8_5M3I56ncdfcVv8qd23MfZoC4HyuVZ3Z4W0oYD",

    //   });
    //   const output = await replicate.run(
    //     "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
    //     {
    //       input: {
            
    //         image: fileUrl,
    //       }
    //     }
    //   );
    //   console.log(output);

    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: "An astronaut riding a rainbow unicorn",
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: true,
          high_noise_frac: 0.8,
          negative_prompt: "",
          prompt_strength: 0.8,
          num_inference_steps: 50
        }
      }
    );
    console.log(output);
}
}

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-center my-10 text-xl">
          Please select your image.
        </h1>
        <form onSubmit={handleSubmit}>
          <input type="file" name="image" onChange={handleImageChange} />
          <Button type="submit">Upload File</Button>
        </form>
      </div>
    </div>
  );
}
