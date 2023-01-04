import type Konva from 'konva';
import type { DispatchOptions } from 'svelte/internal';

// The native KonvaNodeEvent is incomplete, so I created my own
export type KonvaNodeEvent =
	| 'mouseover'
	| 'mouseout'
	| 'mouseenter'
	| 'mouseleave'
	| 'mousemove'
	| 'mousedown'
	| 'mouse'
	| 'wheel'
	| 'click'
	| 'dblclick'
	| 'touchstart'
	| 'touchmove'
	| 'touched'
	| 'tap'
	| 'dbltap'
	| 'pointerdown'
	| 'pointermove'
	| 'pointerup'
	| 'pointercancel'
	| 'pointerover'
	| 'pointerenter'
	| 'pointerout'
	| 'pointerleave'
	| 'pointerclick'
	| 'pointerdblclick'
	| 'dragstart'
	| 'dragmove'
	| 'dragend'
	| 'transformstart'
	| 'transform'
	| 'transformend';

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
	'transformend'
];

export function addEventDispatchers(
	dispatch: <EventKey extends string>(
		type: EventKey,
		detail?: any,
		options?: DispatchOptions | undefined
	) => boolean,
	node: Konva.Node
) {
	events.forEach((event) => {
		node.on(event, (e) => dispatch(event, e));
	});
}

export function addReactiveConfig(config: any, prevConfig: any, node: Konva.Node | Konva.Shape) {
	if (node) {
		if (prevConfig) {
			// Compare prevConfig and config
			// and update shape accordingly
			const prevConfigKeys = Object.keys(prevConfig);
			const configKeys = Object.keys(config);

			// Loop over each new config
			for (let i = 0; i < configKeys.length; i++) {
				const key = configKeys[i];
				const value = config[key];

				// If the key is not in the previous config
				// or the value has changed
				if (!prevConfigKeys.includes(key) || prevConfig[key] !== value) {
					// Update the shape
					node.setAttr(key, value);
				}
			}
		}

		prevConfig = config;
	}
}
