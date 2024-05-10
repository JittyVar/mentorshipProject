import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { exec } from "child_process";
import csvParser from "csv-parser";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const fs = require("fs");
  const rmdPath = "./src/app/api/pair/matchingAlgorithm.Rmd";
  const dataArray: any[] = [];

  try {
    // Execute R script
    await new Promise<void>((resolve, reject) => {
      exec(`Rscript -e "rmarkdown::render('${rmdPath}')"`, (err) => {
        if (err) {
          console.error("Error executing Rmd file:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Read the CSV file and parse it
    await new Promise<void>((resolve, reject) => {
      const stream = fs
        .createReadStream("./src/app/api/pair/proposed_matches.csv")
        .pipe(csvParser())
        .on(
          "data",
          (data: {
            mentee_name: any;
            mentee_email: any;
            mentor_name: any;
            mentor_email: any;
          }) => {
            // Push each row of data to the array
            dataArray.push({
              mentee_name: data.mentee_name,
              mentee_email: data.mentee_email,
              mentor_name: data.mentor_name,
              mentor_email: data.mentor_email,
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
