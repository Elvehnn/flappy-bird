export const apiErrorHandler = (status: number) => {
    //TODO: добавить обработку 400, 401 и 500

    if (status === 404) {
        window.location.replace("/error404");
    }
};
