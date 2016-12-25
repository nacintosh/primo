import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

function renderFullPage(renderedContent) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Primo</title>
                <meta charset="UTF-8" />
                <style> body { margin: 0; } </style>
            </head>
            <body>
                <div id="root">${renderedContent}</div>
                <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
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
