export const converToSocialNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
};
