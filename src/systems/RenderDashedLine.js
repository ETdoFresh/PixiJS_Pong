import { System } from "./System.js";
import { Components } from "../components/Components.js";


export class RenderDashedLine extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.DashedLine);
    }

    entityAdded(entity) {
        const dashedLine = entity.getComponent(Components.DashedLine);
        if (!dashedLine) return;
        console.log(dashedLine);
        dashedLine.pixi = new PIXI.Graphics();
        this.drawDashLine(dashedLine);
        this.container.addChild(dashedLine.pixi);
    }
    
    drawDashLine(dashedLine) {
        const dashLength = 10;
        const gapLength = 5;
        dashedLine.pixi.clear();
        dashedLine.pixi.lineStyle(dashedLine.lineWidth, dashedLine.color, dashedLine.alpha, dashedLine.alignment);

        const x0 = dashedLine.x0;
        const y0 = dashedLine.y0;
        const x1 = dashedLine.x1;
        const y1 = dashedLine.y1;
        const dx = x1 - x0;
        const dy = y1 - y0;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const dashCount = Math.floor(distance / (dashLength + gapLength));
        const dashX = dx / dashCount;
        const dashY = dy / dashCount;

        let q = 0;
        let x = x0;
        let y = y0;
        while (q++ < dashCount) {
            dashedLine.pixi.moveTo(x, y);
            x += dashX;
            y += dashY;
            dashedLine.pixi.lineTo(x, y);
            x += dashX;
            y += dashY;
        }
    }

    entityRemoved(entity) {
        const dashedLine = entity.getComponent(Components.DashedLine);
        if (!dashedLine) return;
        this.container.removeChild(dashedLine.pixi);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const dashedLine = entity.getComponent(Components.DashedLine);
            if (!dashedLine.pixi) continue;
            this.drawDashLine(dashedLine);
        }
    }
}
