export const passwordValidator = ( require = true ) => ( _, value ) => {
    if (value && require) {
        if (/\s/.test( value )) {
            return Promise.reject( `Password shouldn't contains any spaces!` );
        }
        if (!/(.*[A-Z].*)/.test( value )) {
            return Promise.reject(
                `Password should contains at least one uppercase character!`
            );
        }
        if (value.length < 8) {
            return Promise.reject( `Password should be at least ${8} characters long!` );
        }
    }
    return Promise.resolve();
};
