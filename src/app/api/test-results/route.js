import { NextResponse } from "next/server";
import fs from "fs";
export async function GET() {
    const filePath = fs.realpathSync("C:/Users/Chirag.Bitoni/IdeaProjects/SeleniumJavaAutomationFramework/target/test-results.json");
    console.log("Attempting to read file:", filePath);
    if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return NextResponse.json({ error: "Test results file not found" }, { status: 404 });
    }
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);
        return NextResponse.json(jsonData);
    } catch (error) {
        console.error("Error reading test results:", error);
        return NextResponse.json({ error: "Failed to read test results" }, { status: 500 });
    }
}
