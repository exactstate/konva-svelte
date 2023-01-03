import type Konva from 'konva';
import type { DispatchOptions } from 'svelte/internal';

// The native KonvaNodeEvent is incomplete, so I created my own
export type KonvaNodeEvent =
    'mouseover' |
    'mouseout' |
    'mouseenter' |
    'mouseleave' |
    'mousemove' |
    'mousedown' |
    'mouse' |
    'wheel' |
    'click' |
    'dblclick' |
    'touchstart' |
    'touchmove' |
    'touched' |
    'tap' |
    'dbltap' |
    'pointerdown' |
    'pointermove' |
    'pointerup' |
    'pointercancel' |
    'pointerover' |
    'pointerenter' |
    'pointerout' |
    'pointerleave' |
    'pointerclick' |
    'pointerdblclick' |
    'dragstart' |
    'dragmove' |
    'dragend' |
    'transformstart' |
    'transform' |
    'transformend';

const events: KonvaNodeEvent[] = [
    'mouseover',
    'mouseout',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mousedown',
    'mouse',
    'wheel',
    'click',
    'dblclick',
    'touchstart',
    'touchmove',
    'touched',
    'tap',
    'dbltap',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointercancel',
    'pointerover',
    'pointerenter',
    'pointerout',
    'pointerleave',
    'pointerclick',
    'pointerdblclick',
    'dragstart',
    'dragmove',
    'dragend',
    'transformstart',
    'transform',
    'transformend',
];

export default function addEventDispatchers(dispatch: <EventKey extends string>(type: EventKey, detail?: any, options?: DispatchOptions | undefined) => boolean, node: Konva.Node) {
    events.forEach(event => {
        node.on(event, e => dispatch(event, e));
    });
}