import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Line.css';

class Line extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            text: this.props.text,
            isCurLine: this.props.isCurLine,
            cursorPos: this.props.cursorPos,
        };
    }

    componentWillReceiveProps(nextProps) {
        // 是否是当前行
        if (this.props.isCurLine !== nextProps.isCurLine) {
            this.setState({
                isCurLine: nextProps.isCurLine
            });
        }

        // 文本改变
        if (this.props.text !== nextProps.text) {
            this.setState({
                text: nextProps.text,
                cursorPos: nextProps.cursorPos,
            });

            // 文本改变必定引起光标改变
            return;
        }

        // 光标改变
        if (this.props.cursorPos !== nextProps.cursorPos) {
            if (nextProps.cursorPos < 0 || nextProps.cursorPos > this.state.text.length) {
                return;
            }

            this.setState({
                cursorPos: nextProps.cursorPos,
            });
        }
    }

    shouldComponentUpdate(nextState, nextProps) {
        if (this.state.isCurLine !== nextProps.isCurLine) {
            return true;
        }
        if (this.props.text === nextProps.text && this.props.cursorPos === nextProps.cursorPos) {
            return false;
        }

        return true;
    }

    getDOM() {
        const { cursorPos, isCurLine, text } = this.state;
        let content = '';
        if (isCurLine) {
            // 如果是当前行，需要拆分
            content = [...text].map((char, index) => {
                let isCursor = index === cursorPos;
                return (
                  <span key={index} className={isCursor ? 'cursor' : ''}>{char}</span>
                )
            });
            // 补光标位
            let isCursor = content.length === cursorPos;
            content.push(
                <span key={content.length} className={isCursor ? 'cursor' : ''}>&nbsp;</span>
            )
        } else {
            // 非当前行直接用文本填充
            content = text;
        }

        return content;
    }

    render() {
        const { hasHead = true, curDir = "~" } = this.props;
        const content = this.getDOM();
        let head = '';
        if (hasHead) {
            head = (
              <span>
                <span className="headIcon">></span>
                <span className="space"></span>
                <span className="dir">{curDir}</span>
                <span className="space"></span>
              </span>
            );
        }
        return (
          <div className="line">
            { head }
            { content }
          </div>
        );
    }
}

Line.propTypes = {
    text: PropTypes.string,
    isCurLine: PropTypes.bool,
    cursorPos: PropTypes.number,
}

export default Line;
