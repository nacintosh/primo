import React from 'react';
import {
    renderToString
} from 'react-dom/server';
import App from './App';
import styles from './App.css'

function renderFullPage(renderedContent, initialProps) {
    const appProps = safeStringify(initialProps);
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Primo</title>
                <meta charset="UTF-8" />
                <style>${styles._getCss()}</style>
            </head>
            <body>
                <div id="root">${renderedContent}</div>
                <script>
                  var APP_PROPS=${appProps};
                </script>
                <script type="text/javascript" src="js/bundle.js" charset="utf-8"></script>
            </body>
        </html>
    `;
}

export default function render(req, res, entities) {
    const renderedContent = renderToString(
      <App videos={entities}/>
    );
    const renderedPage = renderFullPage(renderedContent, entities);
    res.status(200).send(renderedPage);
}

function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/(script)/ig, '<\\/$1')
    .replace(/<!--/g, '<\\!--')
    .replace(/\u2028/g, '\\u2028') // Only necessary if interpreting as JS, which we do
    .replace(/\u2029/g, '\\u2029') // Ditto
}
