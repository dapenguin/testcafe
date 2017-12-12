// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------

import Assignable from '../../utils/assignable';
import {
    createBooleanValidator,
    createIntegerValidator,
    createPositiveIntegerValidator,
    createSpeedValidator
} from './validations/factories';
import {
    ActionIntegerOptionError,
    ActionPositiveIntegerOptionError,
    ActionBooleanOptionError,
    ActionSpeedOptionError
} from '../../errors/test-run';

export var integerOption         = createIntegerValidator(ActionIntegerOptionError);
export var positiveIntegerOption = createPositiveIntegerValidator(ActionPositiveIntegerOptionError);
export var booleanOption         = createBooleanValidator(ActionBooleanOptionError);
export var speedOption           = createSpeedValidator(ActionSpeedOptionError);


// Acitons
export class ActionOptions extends Assignable {
    constructor (obj, validate) {
        super();

        this.speed = null;

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return [
            { name: 'speed', type: speedOption }
        ];
    }
}

// Offset
export class OffsetOptions extends ActionOptions {
    constructor (obj, validate) {
        super();

        this.offsetX = null;
        this.offsetY = null;

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return super._getAssignableProperties().concat([
            { name: 'offsetX', type: integerOption },
            { name: 'offsetY', type: integerOption }
        ]);
    }
}

// Element Screenshot
export class ElementScreenshotsOptions extends OffsetOptions {
    constructor (obj, validate) {
        super();

        this.cropX = null;
        this.cropY = null;
        this.cropWidth = null;
        this.cropHeight = null;

        this._assignFrom(obj, validate);

        if ((this.cropX || this.cropX === 0) && this.cropWidth)
            this.offsetX = Math.floor(this.cropX + this.cropWidth / 2);

        if ((this.cropY || this.cropY === 0) && this.cropHeight)
            this.offsetY = Math.floor(this.cropY + this.cropHeight / 2);
    }

    _getAssignableProperties () {
        return super._getAssignableProperties().concat([
            { name: 'cropX', type: integerOption },
            { name: 'cropY', type: integerOption },
            { name: 'cropWidth', type: integerOption },
            { name: 'cropHeight', type: integerOption },
        ]);
    }
}

// Mouse
export class MouseOptions extends OffsetOptions {
    constructor (obj, validate) {
        super();

        this.modifiers = {
            ctrl:  false,
            alt:   false,
            shift: false,
            meta:  false
        };

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return super._getAssignableProperties().concat([
            { name: 'modifiers.ctrl', type: booleanOption },
            { name: 'modifiers.alt', type: booleanOption },
            { name: 'modifiers.shift', type: booleanOption },
            { name: 'modifiers.meta', type: booleanOption }
        ]);
    }
}


// Click
export class ClickOptions extends MouseOptions {
    constructor (obj, validate) {
        super();

        this.caretPos = null;

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return super._getAssignableProperties().concat([
            { name: 'caretPos', type: positiveIntegerOption }
        ]);
    }
}

// Move
export class MoveOptions extends MouseOptions {
    constructor (obj, validate) {
        super();

        this.speed          = null;
        this.minMovingTime  = null;
        this.holdLeftButton = false;
        this.skipScrolling  = false;

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return super._getAssignableProperties().concat([
            { name: 'speed' },
            { name: 'minMovingTime' },
            { name: 'holdLeftButton' },
            { name: 'skipScrolling', type: booleanOption }
        ]);
    }
}

// Type
export class TypeOptions extends ClickOptions {
    constructor (obj, validate) {
        super();

        this.replace = false;
        this.paste   = false;

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return super._getAssignableProperties().concat([
            { name: 'replace', type: booleanOption },
            { name: 'paste', type: booleanOption }
        ]);
    }
}

// DragToElement
export class DragToElementOptions extends MouseOptions {
    constructor (obj, validate) {
        super(obj, validate);

        this.destinationOffsetX = null;
        this.destinationOffsetY = null;

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return super._getAssignableProperties().concat([
            { name: 'destinationOffsetX', type: integerOption },
            { name: 'destinationOffsetY', type: integerOption }
        ]);
    }
}

//ResizeToFitDevice
export class ResizeToFitDeviceOptions extends Assignable {
    constructor (obj, validate) {
        super();

        this.portraitOrientation = false;

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return [
            { name: 'portraitOrientation', type: booleanOption }
        ];
    }
}

//Assertion
export class AssertionOptions extends Assignable {
    constructor (obj, validate) {
        super();

        this.timeout = null;

        this._assignFrom(obj, validate);
    }

    _getAssignableProperties () {
        return [
            { name: 'timeout', type: positiveIntegerOption }
        ];
    }
}
