const routes = {
    home: "home",
    services: "services",
    roadmap: "roadmap",
    about: "about",
    team: "team",
    contact: "contact",

    private: {
        home: "/admin",
        trasaction: "/admin/transaction",
        voucher: "/admin/voucher",
        account: "/admin/account",
        category: "/admin/category",
        founder: "/admin/founder",
        roadmap: "/admin/roadmap",
    },
} as const;

export default routes;
