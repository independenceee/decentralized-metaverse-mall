const routes = {
    home: "home",
    services: "services",
    roadmap: "roadmap",
    about: "about",
    team: "team",
    contact: "contact",
    faq: "faq",
    tokenomics: "token-sale",

    private: {
        home: "/admin",
        trasaction: "/admin/transaction",
        voucher: "/admin/voucher",
        account: "/admin/account",
        category: "/admin/category",
        founder: "/admin/founder",
        roadmap: "/admin/roadmap",
        deal: "/admin/hot-deal",
        banner: "/admin/banner",
        wallet: "/admin/wallet",
    },
} as const;

export default routes;
