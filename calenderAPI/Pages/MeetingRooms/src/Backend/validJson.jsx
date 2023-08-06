const isValidJSON = obj => {
    try {
        JSON.parse(obj);
        return true;
    } catch (e) {
        return false;
    }
};

export default isValidJSON;