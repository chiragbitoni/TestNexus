import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const candidatePaths = [
        process.env.TEST_RESULTS_PATH,
        path.join(process.cwd(), "public", "test-results.json"),
        "D:/Personal/Projects/DemoQASeleniumAutomation/target/test-results.json",
        "C:/Users/Chirag.Bitoni/IdeaProjects/SeleniumJavaAutomationFramework/target/test-results.json"
    ].filter(Boolean);

    for (const filePath of candidatePaths) {
        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, "utf8");
                const jsonData = JSON.parse(data);
                return NextResponse.json(jsonData);
            } catch (error) {
                console.error(`Error reading ${filePath}:`, error);
            }
        }
    }

    return NextResponse.json({ error: "Test results file not found" }, { status: 404 });
}
