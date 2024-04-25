import configs from "@/configs";

import { HomeIcon, AddressCardIcon, TransactionIcon, UserIcon, CategoryIcon, BiUser, BiDialpad, FaIdeal, FaStickerMule } from "@/components/Icons";

const publicRoutes = [
    { name: "Home", redirect: configs.routes.home },
    { name: "About", redirect: configs.routes.about },
    { name: "How it works", redirect: configs.routes.services },
    { name: "Roadmap", redirect: configs.routes.roadmap },
    { name: "Tokenomics ", redirect: configs.routes.tokenomics },
];

const privateRoutes = [
    { name: "Home", redirect: configs.routes.private.home, Icon: HomeIcon },
    { name: "Transaction", redirect: configs.routes.private.trasaction, Icon: TransactionIcon },
    { name: "Account", redirect: configs.routes.private.account, Icon: UserIcon },
    { name: "Voucher", redirect: configs.routes.private.voucher, Icon: AddressCardIcon },
    { name: "Category", redirect: configs.routes.private.category, Icon: CategoryIcon },
    { name: "Founder", redirect: configs.routes.private.founder, Icon: BiUser },
    { name: "Roadmap", redirect: configs.routes.private.roadmap, Icon: BiDialpad },
    { name: "Hot Deal", redirect: configs.routes.private.deal, Icon: FaIdeal },
    { name: "Banner", redirect: configs.routes.private.banner, Icon: FaStickerMule },
];

export { privateRoutes, publicRoutes };
