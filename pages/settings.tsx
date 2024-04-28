import Link from "next/link";
import "../app/globals.css";
import ReturnBtn from "@/app/components/buttons/returnBtn";
import Header from "@/app/components/header";
import ThemeSwitcher from "@/app/components/buttons/themeBtn";
import { Providers } from "@/app/providers";
import LogoutBtn from "@/app/components/buttons/logoutBtn";
import { AuthProvider } from "@/app/authprovider";

function ThemeBubble(){
    return(
        <div className="settings-bubble component-bg">
            <h2 className="sub-heading">Theme</h2>
            <ThemeSwitcher/>
        </div>
    );
}
function VersionBubble(props:{text:string}){
    return(
        <div className="settings-bubble component-bg">
            <h2 className="sub-heading">Version</h2>
            <div>{props.text}</div>
        </div>
    );
}
function ChangelogBubble(){
    return(
        <div className="settings-bubble component-bg">
            <Link href={"/changelog"}>
                <h2 className="sub-heading">Changelog</h2>
            </Link>
        </div>
    );
}
function LogoutBubble(){
    return(
        <div className="settings-bubble component-bg">
            <h2 className="sub-heading">Logout</h2>
            <LogoutBtn/>
        </div>
    );
}
export default function Settings(){
    return(
        <Providers>
            <AuthProvider>
                <div>
                    <Header>
                        <ReturnBtn />
                    </Header>
                    <h1 className="title">Settings</h1>
                    <div className="settings-container">
                        <ThemeBubble/>
                        <VersionBubble text="1.1.0"/>
                        <ChangelogBubble/>
                        <LogoutBubble/>
                    </div>
                </div>
            </AuthProvider>
        </Providers>
    );
}