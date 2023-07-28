import { System } from './System.js';
import { Components } from '../components/Components.js';

export class ListenForInput extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Input);
    }

    entityAdded(entity) {
        const input = entity.getComponent(Components.Input);
        if (!input) return;
        input.keys = {};
        input.quadrant = {}
        input.onKeyDown = (event) => { input.keys[event.key] = true; };
        input.onKeyUp = (event) => { input.keys[event.key] = false; };
        input.onPointerDown = (event) => {
            input.quadrant.x = event.clientX < window.innerWidth / 2 ? -1 : 1;
            input.quadrant.y = event.clientY < window.innerHeight / 2 ? -1 : 1;
            input.quadrant.pointerDown = true;
        };
        input.onPointerUp = (event) => {
            input.quadrant.pointerDown = false;
        };
        window.addEventListener('keydown', input.onKeyDown);
        window.addEventListener('keyup', input.onKeyUp);
        window.addEventListener('pointerdown', input.onPointerDown);
        window.addEventListener('pointerup', input.onPointerUp);
    }

    entityRemoved(entity) {
        const input = entity.getComponent(Components.Input);
        if (!input) return;
        window.removeEventListener('keydown', input.onKeyDown);
        window.removeEventListener('keyup', input.onKeyUp);
        window.removeEventListener('pointerdown', input.onPointerDown);
        window.removeEventListener('pointerup', input.onPointerUp);
    }
}