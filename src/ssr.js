import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import styles from '../public/js/styles.css'

function renderFullPage(renderedContent) {
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
                <script type="text/javascript" src="js/bundle.js" charset="utf-8"></script>
            </body>
        </html>
    `;
}

export default function render(req, res) {
    const renderedContent = renderToString(
      <App />
    );
    const renderedPage = renderFullPage(renderedContent);
    res.status(200).send(renderedPage);
}
