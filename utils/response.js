exports.success = (res, data, message = 'Success') => {
    res.status(200).json({
        status: 'success',
        message,
        data,
    });
};

exports.error = (res, message = 'Error', code = 500) => {
    res.status(code).json({
        status: 'error',
        message,
    });
};
