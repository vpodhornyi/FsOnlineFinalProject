export const replaceDuplicatesByProperty = (arr = [], objProperty = "") => {
    return arr?.reduce((o, i) => {
        if (!o.find(v => v[objProperty] === i[objProperty])) {
            o.push(i);
        }
        return o;
    }, []);
}