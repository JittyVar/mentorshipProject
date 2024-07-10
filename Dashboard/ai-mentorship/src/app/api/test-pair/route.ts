import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { exec } from "child_process";
import csvParser from "csv-parser";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextApiResponse) {
  const fs = require("fs");
  const rmdPath =
    "./src/app/api/backend/tests/dummy-data-test/test app v1 dummy data.py";
  const dataArray: any[] = [];

  try {
    // Execute R script
    await new Promise<void>((resolve, reject) => {
      exec(`python3 '${rmdPath}'`, (err) => {
        if (err) {
          console.error("Error executing python file:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Send the response with populated dataArray
    return Response.json(dataArray);
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Internal server error" });
  }
}
