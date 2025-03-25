"use client"

import {useEffect, useState} from "react";
import {Button, Drawer} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkIfDesktop = () => {
            setIsDesktop(window.innerWidth <= 1200);
        };

        checkIfDesktop();
        window.addEventListener('resize', checkIfDesktop);
        return () => window.removeEventListener('resize', checkIfDesktop);
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const DashboardContent = () => (
        <>
            <div className="flex w-full gap-2.5">
                <Image width={50} height={50} className="rounded-full" src="/medal.jpg" alt={"logo"} />
            </div>
            <div className="flex flex-col gap-5">
                <Link className="text-neutral-50" href={'/'}>
                    Accueil
                </Link>
                <Link className="text-neutral-50" href={'/ranking'}>
                    Classements
                </Link>
                <Link className="text-neutral-50" href={'/custom'}>
                    Bataille personnalisée
                </Link>
            </div>

        </>
    );

    if (!isDesktop) {
        return (
            <div className="flex flex-col h-screen w-[300px] p-5 gap-10 bg-[#0B162C]">
                <DashboardContent />
            </div>
        );
    }

    return (
        <>
            <Button
                type="primary"
                onClick={showDrawer}
                icon={<MenuOutlined />}
                style={{ position: 'fixed', right: 20, top: 20, zIndex: 999, background: '#0B162C' }}
            >
                Menu
            </Button>
            <Drawer
                style={{backgroundColor: '#0B162C', color: 'white'}}
                title="Classements"
                placement="left"
                closable={true}
                onClose={onClose}
                open={open}
                width={300}
            >
                <div className="flex flex-col gap-10">
                    <DashboardContent />
                </div>
            </Drawer>
        </>

    );
}

export default Dashboard;