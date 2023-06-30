module.exports = (data) => {
    let result = 0
    data.forEach(el => {
        result = result + el.Tag.price
    });
    return result
    // console.log(result,` ini di helper`);
};