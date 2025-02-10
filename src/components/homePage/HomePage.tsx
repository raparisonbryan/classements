"use client"

import { Card } from 'antd';
import {useRouter} from "next/navigation";

const HomePage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col p-10 gap-5 w-full">
            <h1 className="text-4xl">Choisi un thème</h1>
            <div className="w-3/4 h-0.5 bg-neutral-50"></div>
            <div className="pt-10 grid grid-cols-3 gap-5">
                <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    onClick={() => {router.push('/battle')}}
                >
                    <h2>Chiens</h2>
                </Card>
            </div>
        </div>
    );
}

export default HomePage;