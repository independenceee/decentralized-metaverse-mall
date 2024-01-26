const routes = {
    home: "#home",
    services: "#services",
    roadmap: "#roadmap",
    about: "#about",
    team: "#team",
    contact: "#contact",

    private: {
        home: "/admin",
        trasaction: "/admin/trasaction",
        voucher: "/admin/voucher",
    },
} as const;

export default routes;
