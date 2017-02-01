function tel() {

    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }
        var value = tel.toString().trim().replace(/^\+/, '');
        if (value.match(/[^0-9]/)) {
            return tel;
        }
    };

}

export default {
    name: 'tel',
    fn: tel
};