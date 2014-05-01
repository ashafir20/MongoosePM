// SHARED VALIDATION FUNCTIONS
function isNotTooShort(string) {
    return string && string.length >= 5;
};
exports.isNotTooShort = isNotTooShort;

var validateLength = [{ validator: isNotTooShort, msg: 'Too short' }];
exports.validateLength = validateLength;

// UExternal email validation object
var validateEmail = [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email address"];
exports.validateEmail = validateEmail;