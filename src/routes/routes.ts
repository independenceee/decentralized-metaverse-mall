import configs from "@/configs";

const publicRoutes = [
    { name: "Home", redirect: configs.routes.home },
    { name: "About", redirect: configs.routes.about },
    { name: "Services", redirect: configs.routes.services },
    { name: "Roadmap", redirect: configs.routes.roadmap },
    { name: "Contact", redirect: configs.routes.contact },
];

const privateRoutes:any = [];

export { privateRoutes, publicRoutes };
