import React, { Component } from 'react';
import utils from '../utils';
import './App.css';

import cmd from '../commands';
import Line from './Line/Line';

class App extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            selectedText: [],
            lines: [],
            curLineIndex: 0,
            cursorPos: 0,
        };

        document.addEventListener('keydown', (e) => {
            const { curLineIndex, lines } = this.state;
            const curLine = lines[curLineIndex];

            let curText = curLine.text || '';
            let curPos = curLine.cursorPos;

            const keyCode = e.keyCode;
            console.log(keyCode)

            if (keyCode === 13) {
                // 执行命令
                this.exec(curText);
            } else {
                if (keyCode === 8) {
                    if (curPos === 0) {
                        return;
                    }
                    // 删除
                    curLine.text = curText.slice(0, curPos - 1) + curText.slice(curPos);
                    curLine.cursorPos -= 1;
                } else if (keyCode === 37) {
                    // 左移
                    curLine.cursorPos -= 1;
                } else if (keyCode === 39) {
                    // 右移
                    curLine.cursorPos += 1;
                } else {
                    if (!utils.isValidInput(keyCode)) {
                        return;
                    }
                    // 输入
                    curLine.text = curText.slice(0, curPos) + e.key +  curText.slice(curPos);
                    curLine.cursorPos += 1;
                }

                // 矫正光标位置
                if (curLine.cursorPos < 0) {
                    curLine.cursorPos = 0;
                }

                if (curLine.cursorPos >= curLine.text.length) {
                    curLine.cursorPos = curLine.text.length;
                }

                this.setState({
                    lines: [
                        ...lines.splice(0, curLineIndex),
                        curLine,
                        ...lines.splice(curLineIndex)
                    ]
                });
            }
        });
    }

    componentWillMount() {
        this.init();
    }

    init() {
        const welcomeLine = {
            hasHead: false,
            text: 'Last login: Sat Apr 15 10:54:40 on ttys001'
        };

        const newLine = this.getNewLine();

        this.setState({
            lines: [ welcomeLine, newLine ],
            curLineIndex: 1,
        });
    }

    getNewLine(attr = {}) {
        const { hasHead = true, text = '', cursorPos = 0 } = attr;
        return {
            hasHead,
            text,
            cursorPos,
        }
    }

    exec(command) {
        const { curLineIndex, lines } = this.state;

        let _command = command.trim();

        let resultLines = [];

        if (_command) {
            resultLines = cmd(_command) || [];
        }

        // 添加新行
        const newLine = this.getNewLine();
        this.setState({
            lines: [...lines, ...resultLines, newLine],
            curLineIndex: curLineIndex + resultLines.length + 1,
        });
    }

    render() {
        const { lines, curLineIndex } = this.state;
        return (
          <div className="App">
            {
                lines.map((item, index) => {
                    const { hasHead = true, text = '', cursorPos } = item;
                    const isCurLine = index === curLineIndex;
                    return (
                        <Line
                          key={index}
                          isCurLine={isCurLine}
                          hasHead={hasHead}
                          text={text}
                          cursorPos={cursorPos}
                        />
                    )
                })
            }
          </div>
        );
    }
}

export default App;
