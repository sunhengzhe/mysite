const exec = (cmd, ...args) => {
    try {
        const runner = require(`./${cmd}`);
        return runner(...args);
    } catch (e) {
        return [{
            hasHead: false,
            text: `zsh: command not found: ${cmd}`,
        }];
    }
}

export default exec;