type Accordions = {
    general: Accordion[];
    ico: Accordion[];
    token_sale: Accordion[];
    investers: Accordion[];
};

type Accordion = {
    id: number;
    question: string;
    answer: string;
};

const tabs: { id: number; name: string; identity: string }[] = [
    {
        id: 1,
        name: "Install eternl wallet",
        identity: "general",
    },
    {
        id: 2,
        name: "ICO Questions",
        identity: "ico",
    },
    {
        id: 3,
        name: "Token sale",
        identity: "token_sale",
    },
    {
        id: 4,
        name: "Investers",
        identity: "investers",
    },
];

const accordions: Accordions = {
    general: [
        {
            id: 1,
            question: "1. Setting and Installing eternl wallet",
            answer: "You can also use another wallet if you have one, but for illustration purposes we will use Eternl and Nami. You can install the Eternl wallet by visiting the Chrome store and adding the extension to your browser.",
        },
        {
            id: 2,
            question: "2. Choose wallet network",
            answer: "You probably already have a Mainnet wallet if you are a regular Cardano user. But to deposit tADA, you will need to transfer your wallet to the Preview network. Do this on Eternl, click on the button in the bottom right corner that says Mainnet.",
        },
        {
            id: 3,
            question: "3. Create a wallet and enter 24 characters to unlock the wallet",
            answer: "Now create a wallet by clicking on the Add Wallet button. Follow the steps, name your wallet and write down the seed phrase as you would with any wallet. Once created, you will see your wallet in the left menu.",
        },
        {
            id: 4,
            question: "4. Create a wallet and enter 24 characters to unlock the wallet",
            answer: "Once you have completed this, you will need to grant access to the Dapp Connector. Under the left menu with your wallet, click on the button labeled DApp Browser. Now, from the main menu select “Connect Account”, select your new test wallet at the “Select Direct Connect Wallet” menu and then click “Connect As DApp Account”.",
        },
        {
            id: 5,
            question: "5. Complete creating a wallet in cardano",
            answer: "Congratulations. Can you go. But before you do, get some test tada in your wallet.",
        },
    ],
    ico: [
        {
            id: 1,
            question: "2. What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 2,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 3,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 4,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
    ],
    token_sale: [
        {
            id: 1,
            question: "3. What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 2,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 3,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 4,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
    ],
    investers: [
        {
            id: 1,
            question: "4. What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 2,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 3,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 4,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
    ],
};

export { tabs, accordions };
