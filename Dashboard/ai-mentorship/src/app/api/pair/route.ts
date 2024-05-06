import database from "@/firestore/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { exec } from "child_process";
import { matchingResults } from "./output";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const rmdPath = "./src/app/api/pair/matchingAlgorithm.Rmd";

    // Execute R Markdown file using Rscript command
    exec(
      `Rscript -e "rmarkdown::render('${rmdPath}')"`,
      (err, stdout, stderr) => {
        if (err) {
          console.error("Error executing Rmd file:", err);
          return Response.json({ error: "Internal server error" });
        }
        // If execution is successful, you can return a success message
        return Response.json(matchingResults);
      }
    );
    return Response.json(matchingResults);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal server error" });
  }
}
