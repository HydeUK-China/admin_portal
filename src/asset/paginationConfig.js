import _ from 'lodash';
export const itemsCountPerPage = 6;

export const sliceData = (curData, offset) => {
    const slice = _.slice(curData, offset, offset + itemsCountPerPage);
    const totalItemsCount = curData.length;

    return [totalItemsCount, slice]
}