"use client";
import { useEffect, useRef, useState } from "react";
import { CollectionView } from "@mescius/wijmo";
import * as wjGrid from "@mescius/wijmo.react.grid";
import "./page.css";
import * as wjGridFilter from "@mescius/wijmo.react.grid.filter";
import * as wjGridXlsx from "@mescius/wijmo.grid.xlsx";
import * as wjGridPdf from '@mescius/wijmo.grid.pdf';
import * as pdf from '@mescius/wijmo.pdf';
export default function Report({ params }: { params: Promise<{ index: number }> }) {
    interface TestCase {
    }

    interface TestRun {
        testCases: TestCase[];
    }
    const gridRef = useRef<wjGrid.FlexGridRef | any>(null);
    const [index, setIndex] = useState<number | null>(null);
    const [testRuns, setTestRuns] = useState<TestRun[]>([]);
    const [testCasesCollectionView, setTestCasesCollectionView] = useState<any>();

    useEffect(() => {
        async function unwrapParams() {
            const unwrappedParams = await params;
            setIndex(unwrappedParams.index);
        }
        unwrapParams();
    }, [params]);

    useEffect(() => {
        async function getTestResults() {
            const res = await fetch("http://localhost:3000/api/test-results", { cache: "force-cache" });
            if (!res.ok) {
                throw new Error("Failed to fetch test results");
            }
            const data = await res.json();
            setTestRuns(data);
        }
        getTestResults();
    }, []);

    useEffect(() => {
        if (testRuns.length > 0 && index !== null) {
            const cv = new CollectionView(testRuns[index].testCases,{
                sortDescriptions:["testCaseId"]
            });
            setTestCasesCollectionView(cv);
        }
    }, [testRuns, index]);  

    const exportExcel = ()=>{
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(gridRef.current?.control,{
            includeColumnHeaders:true
        },"TestResults.xlsx")
    }
    const exportPDF = ()=>{
        wjGridPdf.FlexGridPdfConverter.export(gridRef.current?.control,"TestResults.pdf",{
            documentOptions: {
                pageSettings: {
                    layout: pdf.PdfPageOrientation.Landscape
                },
            }
        })
    }

    return (
        <div>
            <div className="row mt-2 mb-2">
                <button className="btn btn-primary col-1 ml-5" onClick={exportExcel}>Excel Export</button>
                <button className="btn btn-primary col-1 ml-5" onClick={exportPDF}>PDF Export</button>
            </div>
            <wjGrid.FlexGrid itemsSource={testCasesCollectionView} isReadOnly={true} ref={gridRef} autoRowHeights>
                <wjGridFilter.FlexGridFilter></wjGridFilter.FlexGridFilter>
                <wjGrid.FlexGridColumn binding={"testCaseId"} width={".5*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"description"} width={"2*"} wordWrap={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"testName"} width={"*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"status"} width={"0.7*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"message"} wordWrap={true} width={"3*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"timeMs"} width={"0.7*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"startTime"} width={"*"} format={"tt"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"endTime"} width={"*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"class"} width={"2*"}></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>
    );
}