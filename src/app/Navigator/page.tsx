"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

export default function Navigator() {
    const pathName = usePathname();
    return (
        <nav className="navbar sticky-top navbar-expand-lg" style={{ backgroundColor: "white", borderBottom: "2px solid green" }}>
            <Link href={"/"} className="navbar-brand text-success ml-3">
            <img src="/logo.png" alt="TestNexus Logo" style={{ height: "40px", marginRight: "10px" }} />
            </Link>
            <div className="navbar-nav">
                <Link href={"/"} className={pathName === "/" ? "nav-link text-success mr-3 ml-3 text-left" : "nav-link text-dark mr-3 ml-3 text-left"}>
                    Tests List
                </Link>
                <Link href={"/ReportNavigator"} className={pathName === "/ReportNavigator" ? "nav-link text-success mr-3 ml-3 text-left" : "nav-link text-dark mr-3 ml-3 text-left"}>
                    ReportNavigator
                </Link>
            </div>
        </nav>
    )
}