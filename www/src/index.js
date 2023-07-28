import { Application } from "./Application.js";

const app = new Application();
document.getElementById("app").appendChild(app.view);

app.start();

// DEBUG
window.app = app;

try {
    module.hot.dispose(() => {
        app.destroy();
        console.log("destroyed");
    });
} catch (e) { }
