exports.log = (message) => {
    const date = new Date().toISOString();
    console.log(`[${date}] ${message}`);
};
