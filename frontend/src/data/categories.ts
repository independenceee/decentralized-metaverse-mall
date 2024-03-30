import icons from "@/assets/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Category = {
    id: number;
    image: string | StaticImport;
    name: string;
};

const categories: Category[] = [
    {
        id: 1,
        image: icons.travel,
        name: "Du lịch",
    },
    {
        id: 2,
        image: icons.visa,
        name: "Visa",
    },
    {
        id: 3,
        image: icons.clothes,
        name: "Quần áo",
    },
    {
        id: 4,
        image: icons.sprituality,
        name: "Đồ lễ",
    },
    {
        id: 5,
        image: icons.electricDevices,
        name: "Điện tử",
    },
];

export default categories;
