import formidable from "formidable";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import cloudinary from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};
// this will disable the next js custom  otherwise the auto parser of Next js will destroy your files

export async function POST(req: NextRequest) {
  const form = formidable({ multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, _, files) => {
      if (err)
        return reject(
          NextResponse.json(
            { message: "error while uploading files" },
            { status: 500 }
          )
        );
      const file = files.file;
      if (!file) {
        return reject(
          NextResponse.json({ message: "No file found" }, { status: 400 })
        );
      }
      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "next_uploads",
        });
        resolve(NextResponse.json(result));
      } catch (error: unknown) {
        reject(NextResponse.json({ message: error.message }, { status: 500 }));
      }
    });
  });
}
