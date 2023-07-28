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
        input.gamepad = { leftStickY: 0, rightStickY: 0, dpadY: 0 }
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

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const input = entity.getComponent(Components.Input);
            const gamepads = navigator.getGamepads();
            input.gamepad.leftStickY = 0;
            input.gamepad.rightStickY = 0;
            input.gamepad.dpadY = 0;
            for (let j = 0; j < gamepads.length; j++) {
                const gamepad = gamepads[j];
                if (!gamepad) continue;
                input.gamepad.leftStickY += gamepad.axes[1];
                input.gamepad.rightStickY += gamepad.axes[3];
                input.gamepad.dpadY += gamepad.buttons[13].value - gamepad.buttons[12].value;
            }
        }
    }
}