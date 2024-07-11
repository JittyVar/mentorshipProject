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

    // Read the CSV file and parse it
    await new Promise<void>((resolve, reject) => {
      const stream = fs
        .createReadStream(
          "./src/app/api/backend/tests/dummy-data-test/proposed_matches.csv"
        )
        .pipe(csvParser())
        .on(
          "data",
          (data: {
            unique_id: any;
            fullName: any;
            mentor_fullName: any;
            predicted_cosine_similarity: any;
          }) => {
            // Push each row of data to the array
            dataArray.push({
              unique_id: data.unique_id,
              fullName: data.fullName,
              mentor_fullName: data.mentor_fullName,
              predicted_cosine_similarity: data.predicted_cosine_similarity,
            });
          }
        )
        .on("end", () => {
          // After parsing is complete, dataArray contains the parsed data
          resolve();
        })
        .on("error", () => {
          console.error("Error reading CSV file:");
        });

      // Wait for the stream to finish
      stream.on("finish", resolve);
    });
    // Send the response with populated dataArray
    return Response.json(dataArray);
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Internal server error" });
  }
}
