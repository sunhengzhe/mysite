function isValidInput(key) {
    if (key >= 48 && key <= 57) {
        // 数字
        return true;
    }

    if (key >= 65 && key <= 90) {
        // 字母
        return true;
    }

    if (key === 32 // 空格
        || key > 188 // 其他
    ) {
        return true;
    }

    return false;
}

export default {
    isValidInput
};
