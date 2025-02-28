"use client";
import { useEffect, useRef, useState } from "react";
import "./page.css";
import * as wjInput from "@mescius/wijmo.react.input";
import * as wjGrid from "@mescius/wijmo.react.grid";
import * as wjGridFilter from "@mescius/wijmo.react.grid.filter";
import "@mescius/wijmo.styles/themes/wijmo.theme.modern.css"
import * as wjGridXlsx from "@mescius/wijmo.grid.xlsx";
import * as wjGridPdf from '@mescius/wijmo.grid.pdf';
import * as pdf from '@mescius/wijmo.pdf';

export default function ReportNavigator() {
    const gridRef = useRef<wjGrid.FlexGridRef | any>(null);
    const [testRuns, setTestRuns] = useState([]);
    const [selectedTest, setSelectedTest] = useState(0);
    const [currentTestCasesArray, setCurrentTestCasesArray] = useState<Array<Object>>([]);

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

    const comboBoxSelectedIndexChanged = (sender: any) => {
        setSelectedTest(sender.selectedIndex);
        setCurrentTestCasesArray(sender.selectedValue?.testCases);
    };

    const styleRows = (s: any, e: any) => {
        for (var i = 0; i < s.rows.length; i++) {
            var row = s.rows[i];
            row.maxHeight = 60;
            var item = row.dataItem;

            if (item.status == "PASSED") {
                row.cssClass = 'green';
            }
            else if (item.status == "FAILED") {
                row.cssClass = 'red';
            }
            else if (item.status == "SKIPPED") {
                row.cssClass = 'yellow';
            }
        }
    };

    const exportExcel = () => {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(gridRef.current?.control, {
            includeColumnHeaders: true
        }, "TestResults.xlsx");
    };

    const exportPDF = () => {
        wjGridPdf.FlexGridPdfConverter.export(gridRef.current?.control, "TestResults.pdf", {
            documentOptions: {
                pageSettings: {
                    layout: pdf.PdfPageOrientation.Landscape
                },
            }
        });
    };

    return (
        <div>
            <div className="row mt-2 mb-2">
                <div className="combo-box-container col-9">
                    <wjInput.ComboBox itemsSource={testRuns} displayMemberPath="testExecutionDate" selectedIndexChanged={comboBoxSelectedIndexChanged}></wjInput.ComboBox>
                </div>
                <div className="button-container col-3">
                    <button className="btn btn-primary" onClick={exportExcel}>Excel Export</button>
                    <button className="btn btn-primary" onClick={exportPDF}>PDF Export</button>
                </div>
            </div>
            <wjGrid.FlexGrid ref={gridRef} itemsSource={currentTestCasesArray} loadedRows={styleRows} alternatingRowStep={0} autoRowHeights={true}>
                <wjGridFilter.FlexGridFilter></wjGridFilter.FlexGridFilter>
                <wjGrid.FlexGridColumn binding={"testCaseId"} width={".5*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"description"} width={"2*"} wordWrap={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"testName"} width={"*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"status"} width={"0.7*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"message"} wordWrap={true} width={"3*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"timeSpan"} format={"hh:mm"} width={"*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"timeMs"} width={"0.7*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"startTime"} width={"*"} format={"tt"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"endTime"} width={"*"}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding={"class"} width={"2*"}></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>
    );
}

