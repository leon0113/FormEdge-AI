import Header from "./_components/_common/Header";

export default function DashBoardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // const { isAuthenticated } = getKindeServerSession();
    // const isUserAuthenticated = isAuthenticated();

    // if (!isUserAuthenticated) {
    //     redirect("/");
    // }


    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <div className="w-full flex-1">
                <div>{children}</div>
            </div>
        </div>
    );
}
