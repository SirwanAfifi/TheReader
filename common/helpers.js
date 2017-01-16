(function (helper) {

    helper.getSummary = function (str, max) {
        var result = str;
        if (result.toString().length > max) {
            result = result.substring(0, max);
            result += "....";
        }
        return result;
    };

    helper.stripHTML = function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    };


})(module.exports);