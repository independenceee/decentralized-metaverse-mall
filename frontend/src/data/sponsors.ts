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
        id: 5,
        name: "Project Catalyst",
        logo: images.projectCatalystSVG,
        link: "https://projectcatalyst.io/",
    },
    {
        id: 1,
        name: "Cardano",
        logo: images.cardanoSVG,
        link: "https://cardano.org/",
    },
    {
        id: 4,
        name: "koet",
        logo: images.koetWEBP,
        link: "http://dienmaykorea.com",
    },
    {
        id: 6,
        name: "Project Catalyst",
        logo: images.vissare,
        link: "http://visare.com.vn",
    },
    {
        id: 3,
        name: "Vilai Cardano",
        logo: images.vilai,
        link: "https://adapools.org/pool/pool1u7zrgexnxsysctnnwljjjymr70he829fr5n3vefnv80guxr42dv",
    },
    {
        id: 7,
        name: "Samsung",
        logo: images.samsung,
        link: "https://www.samsung.com/vn/",
    },
    {
        id: 2,
        name: "Cổng đấu giá Lạc Việt",
        logo: images.autionLacViet,
        link: "https://lacvietauction.vn/",
    },
];

export default sponsors;
