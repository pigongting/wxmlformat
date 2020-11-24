"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { resolve } = require("path");
const vscode_1 = require("vscode");
const config_1 = require("./config");
function saveFormat(wxml) {
    let oldDocument = {
        fileName: '',
    };
    vscode_1.workspace.onWillSaveTextDocument((e) => {
        const { document: { fileName, isDirty }, } = e;
        if (!isDirty && oldDocument.fileName === fileName) {
            // console.log('no change save 1 ---------->');
            return false;
        }
        oldDocument = { fileName };
        if (config_1.config.onSaveFormat) {
            // 对比格式化后的文本，完全相同，直接返回
            const editor = vscode_1.window.activeTextEditor;
            if (!editor) {
                throw new Error('no active editor');
            }
            const text = editor.document.getText();
            const textformat = wxml.init();
            if (text === textformat._newText) {
                // console.log('no change save 2 ---------->');
                return false;
            }

            // wxml.init();
            const promise = new Promise((resolve) => {
                resolve([textformat]);
            });
            e.waitUntil(promise);
        }
    });
}
exports.default = saveFormat;
//# sourceMappingURL=saveFormat.js.map