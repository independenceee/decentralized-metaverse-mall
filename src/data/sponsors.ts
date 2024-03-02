import { StaticImport } from "next/dist/shared/lib/get-img-props";
import images from "@/assets/images";

export type Sponsor = {
    id: number;
    name: string;
    logo: string | StaticImport;
};

const sponsors: Sponsor[] = [
    {
        id: 1,
        name: "Cardano",
        logo: images.cardano,
    },
    {
        id: 2,
        name: "Cổng đấu giá Lạc Việt",
        logo: images.autionLacViet,
    },
    {
        id: 3,
        name: "Samsung",
        logo: images.samsung,
    },
    {
        id: 4,
        name: "Korean",
        logo: images.samsung,
    },
    {
        id: 5,
        name: "Project Catalyst",
        logo: images.projectCatalyst,
    },
];

export default sponsors;
