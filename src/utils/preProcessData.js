export const preProcessData = (data) => {
    return data.sort((a, b) => {
        if (a.City == null || b.City == null) {
            return 1;
        }
        const compare = a.City.localeCompare(b.City);
        if (compare == 0 && a.Country != null && b.Country != null) {
            return a.Country.localeCompare(b.Country);
        }
        return compare;
    })
}