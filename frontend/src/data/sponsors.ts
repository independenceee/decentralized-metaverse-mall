import { StaticImport } from "next/dist/shared/lib/get-img-props";
import images from "@/assets/images";

export type Sponsor = {
    id: number;
    name: string;
    logo: string | StaticImport;
    link: string;
};

const sponsors: Sponsor[] = [
    {
        id: 1,
        name: "Cardano",
        logo: images.cardano,
        link: "https://cardano.org/",
    },
    {
        id: 2,
        name: "Cổng đấu giá Lạc Việt",
        logo: images.autionLacViet,
        link: "https://lacvietauction.vn/",
    },
    {
        id: 3,
        name: "Vilai Cardano",
        logo: images.vilai,
        link: "https://adapools.org/pool/pool1u7zrgexnxsysctnnwljjjymr70he829fr5n3vefnv80guxr42dv",
    },
    {
        id: 4,
        name: "koet",
        logo: images.koet,
        link: "http://dienmaykorea.com",
    },
    {
        id: 5,
        name: "Project Catalyst",
        logo: images.projectCatalyst,
        link: "https://projectcatalyst.io/",
    },
    {
        id: 6,
        name: "Project Catalyst",
        logo: images.vissare,
        link: "http://visare.com.vn",
    },
    {
        id: 7,
        name: "Samsung",
        logo: images.samsung,
        link: "https://www.samsung.com/vn/",
    },
];

export default sponsors;
