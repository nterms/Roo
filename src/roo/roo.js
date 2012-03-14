//(function(window, undefined) {
    /**
	 * @namespace The Roo namespace
	 */
    var Roo = {};

    // Static functions
    
    /**
	 * Check whether the passed object is an array
	 */
    Roo.MAX = Number.MAX_VALUE;
    
    /**
     * Wraps the angle provided in 0 and 360 degrees. 
     * @function
     * @static
     * @param 	angle 	The angle in degrees. Value may be positive or negative
     * @return	The angle wrapped into the range 0 - 360 degrees.
     */
    Roo.wrapAngle = function(angle) {
        if(a >= 0) {
            return (a % 360);
        } else {
            return 360 + (a % 360);
        }
    };
    
    /**
     * Returns TRUE if the object is an array, FALSE if not.
     * @function
     * @static
     * @param	object	The object to be tested for an array
     * @return	TRUE if the object is an array, FALSE if the object is not an array.
     */
    Roo.isArray = function(object) {
        if( typeof object == 'object' && object !== null)
            if(object.constructor == Array)
                return true;

        return false;
    };
    
    /**
	 * Check whether the object is a DisplayObject or not.
	 * @function
	 * @static
	 * @param	object	The object to be tested
	 * @return	TRUE if the object is a DisplayObject, FALSE if not
	 */
    Roo.isDisplayObject = function(object) {
    	if(object instanceof DisplayObject /* typeof object == 'object' && typeof object.layer != 'undefined' && typeof object.draw == 'function' */) {
    		return true;
    	}
    	
    	return false;
    };
        
    /**
	 * Check whether the object is a Shape or not.
	 * @function
	 * @static
	 * @param	object	The object to be tested
	 * @return	TRUE if the object is a Shape, FALSE if not
	 */
    Roo.isShape = function(object) {
    	if(object instanceof Shape /* typeof object == 'object' && typeof object.layer != 'undefined' && typeof object.draw == 'function' */) {
    		return true;
    	}
    	
    	return false;
    };
    
    /**
	 * Check whether the object is a Layer or not.
	 * @function
	 * @static
	 * @param	object	The object to be tested
	 * @return	TRUE if the object is a Layer, FALSE if not
	 */
    Roo.isLayer = function(object) {
    	if(object instanceof Layer/* typeof object == 'object' && object != null && Roo.isArray(object.shapes) */) {
    		return true;
    	}
    	
    	return false;
    };
    
    /**
	 * Check whether the object is a Stage or not.
	 * @function
	 * @static
	 * @param	object	The object to be tested
	 * @return	TRUE if the object is a Stage, FALSE if not
	 */
    Roo.isStage = function(object) {
    	if(object instanceof Stage /* typeof object == 'object' && object != null && typeof object.container != 'undefined' && Roo.isArray(object.layers) */) {
    		return true;
    	}
    	
    	return false;
    };
    
    Roo.extend = function(base, options, overwrite) {
        overwrite = ( typeof overwrite == 'undefined') ? false : overwrite;

        try {
            for(var i in options) {
                if(overwrite) {
                	// some special case
                	if(i == 'draw' && typeof options[i] == 'function') {
                		base['_paint'] = options[i];
                	} else {
                		base[i] = options[i];
                	}
                } else {
                    if(base[i] == null) {
                        base[i] = options[i];
                    }
                }
            }
        } catch (e) {
            // TODO add some exception handling
            console.log(e.message);
        }

        return base;
    };

    Roo.apply = function(base, options) {
        overwrite = ( typeof overwrite == 'undefined') ? false : overwrite;
        for(var i in options) {
            if( typeof base[i] != 'undefined' && typeof base[i] != 'function' && typeof base[i] != 'object') {
                if(base[i] != options[i]) {
                    // reduce unnecessary context updates
                    base[i] = options[i];
                }
            }
        }

        return base;
    };


    Roo.cache = function(obj) {
        var changed = false;
        for(var i in obj) {
            if( typeof obj[i] != 'function' && typeof obj[i] != 'object') {
                if(obj.cache[i] != obj[i]) {
                    changed = true;
                    obj.cache[i] = obj[i];
                }
            }
        }
        return changed;
    };
    
    Roo.hasChanged = function(obj) {
        for(var i in obj) {
            if( typeof obj[i] != 'function' && typeof obj[i] != 'object') {
                if(obj.cache[i] != obj[i]) {
                    return true;
                }
            }
        }
        return false;
    };
    
    /**
     * The Stage class provides the basement for all the graphics layers of an application to be placesd on. 
     * Stage is the root container for all the graphics objects created with Roo. It works as the primary event manager of an application as well. 
     * 
	 * @class
	 * @constructor
	 * @param	container	ID of the container element of the Stage. 
	 * @param	width	Width of the stage in pixels
	 * @param	height	Height of the stage in pixels
	 */
    function Stage(container, width, height) {
        this.container = null;
        this.layers     = new Array();
        this.display    = null;
        this.graphics   = null;
        this.events     = {
                        click: false,
                        mousedown: false,
                        mouseup: false,
                        mousemove: false,
                        mouseover: false,
                        mouseout: false,
                        touchstart: false,
                        touchend: false,
                        touchmove: false,
                        mousePosition: null,
                        touchPosition: null,
                        previousMousePosition: null,
                        previousTouchPosition: null,
                        keyCode: '',
                        type: ''
                        };
        this.height     = 0;
        this.width      = 0;

        this._init(container, width, height);
    }

    var _stage = Stage.prototype;

    _stage._init = function(container, width, height) {
        var _this = this;
        var _layers = this.layers;
        var _container = this.container  = document.getElementById(container);
        // Stage must have a container - a valid HTML element
        if(!_container) { return null; }
        
        this.width      = width;
        this.height     = height;
        
        // register event handlers
        _container.addEventListener('click', function(evt) {
            if(_this.events.click) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('mousedown', function(evt) {
            if(_this.events.mousedown) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('mouseup', function(evt) {
            if(_this.events.mouseup) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('mousemove', function(evt) {
            if(_this.events.mousemove) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('mouseover', function(evt) {
            if(_this.events.mouseover) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('mouseout', function(evt) {
            if(_this.events.mouseout) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('touchstart', function(evt) {
            if(_this.events.touchstart) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('touchend', function(evt) {
            if(_this.events.touchend) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('touchmove', function(evt) {
            if(_this.events.touchmove) {
                _this._handleEvent(evt);
            }
        });
        /*
        _container.addEventListener('keypress', function(evt) {
            if(_this.events.keypress) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('keydown', function(evt) {
            if(_this.events.keydown) {
                _this._handleEvent(evt);
            }
        });
        
        _container.addEventListener('keyup', function(evt) {
            if(_this.events.keyup) {
                _this._handleEvent(evt);
            }
        });
        */
    };
    
    _stage._handleEvent = function(evt) {
        var _evt = evt || window.event;
        _evt.preventDefault();

    	this.container.style.cursor = 'auto';
        // set the mouse and touch positions
        this.setMousePosition(_evt);
        this.setTouchPosition(_evt);
        this.events.type = _evt.type;

        this.update(true);
    };    
    
    /**
     * Returns the current position of the Stage on the HTML document relative to the top-left corner of the window client area.
     * 
     * @memberOf Stage.prototype
     * @name getPosition
     * @function
     * @return	An object with x,y coordinates of the top-left corner of the stage as its properties.
     */
    _stage.getPosition = function() {
        var _element = this.container;
        var _x = 0;
        var _y = 0;
        while(_element.tagName != 'BODY') {
            _x += _element.offsetLeft;
            _y += _element.offsetTop;
            _element = _element.offsetParent;
        }
        return {x: _x, y: _y};
    };
    
    _stage.setMousePosition = function(evt) {
        var _contPos = this.getPosition();
        var _prevMPos = this.getMousePosition();
        var _x = evt.clientX - _contPos.x + window.pageXOffset;
        var _y = evt.clientY - _contPos.y + window.pageYOffset;
        if(_prevMPos !== null) {
        	this.events.previousMousePosition = {x: _prevMPos.x, y: _prevMPos.y};
        }
        this.events.mousePosition = {x: _x, y: _y};
    };
    
    _stage.getMousePosition = function() {
        return this.events.mousePosition
    };
    
    _stage.setTouchPosition = function(evt) {
        if(evt.touches !== undefined && evt.touches.length == 1) {
            var _contPos = this.getPosition();
            var _prevTPos = this.getTouchPosition();
            var _touch = evt.touches[0];
            var _x = _touch.pageX - _contPos.x + window.pageXOffset;
            var _y = _touch.pageY - _contPos.y + window.pageYOffset;
            if(_prevTPos !== null) {
            	this.events.previousTouchPosition = {x: _prevTPos.x, y: _prevTPos.y};
            }
            this.events.touchPosition = {x: _x, y: _y};
        }
        
        return this;
    };
    
    _stage.getTouchPosition = function() {
        return this.events.touchPosition;
    };
    
    /**
     * Add a layer to the stage.
     * 
     * @memberOf Stage.prototype
     * @name add
     * @function
     * @param {Layer} layer A layer object to be added to the stage.
     * @returns {Stage} The Stage object
     */
    _stage.add = function(layer) {
    	if(Roo.isLayer(layer)) {
    	    layer.setSize(this.width, this.height);
    		this.container.appendChild(layer.graphics.canvas);
    		layer.stage = this;
    		this.layers.push(layer);
    		return true;
    	}
    	
    	return false;
    };    
    
    /**
     * Remove a layer or set of layers from the stage.
     * 
     * @memberOf Stage.prototype
     * @name remove
     * @function
     * @param {Object} layers A layer object or an array of layer objects to be removed from the stage.
     * @returns {Stage} The Stage object
     */
    _stage.remove = function(layers) {
        if(Roo.isLayer(layers)) {
            var _index = this.layers.indexOf(layers);
            if(_index >= 0) {
                layers.stage = null;
                this.layers.splice(_index,1);
                this.container.removeChild(layer.graphics.canvas);
                return true;
            }
        } else if(Roo.isArray(layers)) {
            for(var i = 0; i < layers.length; i++) {
                var _layer = layers[i];
                if(Roo.isLayer(_layer)) {
                    var _index = this.layers.indexOf(_layer);
                    if(_index >= 0) {
                        _layer.stage = null;
                        this.layers.splice(_index,1);
                        this.container.removeChild(layer.graphics.canvas);
                    }
                }
            }
            
            return true;
        }
        
        return false;
    };

	/**
     * Update the stage to re-render the graphics on all the layers and trigger events on DisplayObjects.
     * 
     * @memberOf Stage.prototype
     * @name update
     * @function
     * @returns {Stage} The Stage object
     */
    _stage.update = function(events) {
		var _layers = this.layers;
        if(_layers.length > 0) {
        	if(events) {
        		for(var i = _layers.length - 1; i >= 0 ; i--) {
	                var _layer = _layers[i];	                
	                if(_layer.isListening())
	                    _layer.update();
	            }
        	} else {
	            for(var i = 0; i < _layers.length; i++) {
	                var _layer = _layers[i];	                
	                _layer.update();
	            }
        	}
        }
        
        return this;
    };

    _stage.on = function(event, handler) {
        this.container.addEventListener(event, handler);
    };
    
    /**
     * Enable event listening on the stage.
     * <br/>All supported events:
     * <ul>
     * 	<li>click</li>
     * 	<li>mousedown</li>
     * 	<li>mouseup</li>
     * 	<li>mousemove</li>
     * 	<li>mouseover</li>
     * 	<li>mouseout</li>
     * 	<li>touchstart</li>
     * 	<li>touchend</li>
     * 	<li>touchmove</li>
     * </ul>
     * This method is used to enable all supported events or a selected set of them. Enabling only the reqired events is reccomended as event management is an expensive process consumes more processing power.
     * <pre><code>
     * stage.enableEvents();
     * 
     * stage.enableEvents(['click']);
     * 
     * stage.enableEvents(['click', 'mousemove', 'mousedown']);
     * </code></pre>
     * 
     * @memberOf Stage.prototype
     * @name enableEvents
     * @function
     * @param {Object} events An array of event names to be enabled. Omitting this argument would enable all the supported events.
     * @returns {Stage} The Stage object
     */
    _stage.enableEvents = function(events) {
        if(Roo.isArray(events)) {
            for(var i = 0; i < events.length; i++) {
                var _evt = events[i];
                switch(_evt) {
                    case 'click':       this.events.click       = true; break;
                    case 'mousedown':   this.events.mousedown   = true; break;
                    case 'mouseup':     this.events.mouseup     = true; break;
                    case 'mousemove':   this.events.mousemove   = true; break;
                    case 'mouseover':   this.events.mouseover   = true; break;
                    case 'mouseout':    this.events.mouseout    = true; break;
                    case 'touchstart':  this.events.touchstart  = true; break;
                    case 'touchend':    this.events.touchend    = true; break;
                    case 'touchmove':   this.events.touchmove   = true; break;
                }
            }
        } else {
            this.events.click       = true;
            this.events.mousedown   = true;
            this.events.mouseup     = true;
            this.events.mousemove   = true;
            this.events.mouseover   = true;
            this.events.mouseout    = true;
            this.events.touchstart  = true;
            this.events.touchend    = true;
            this.events.touchmove   = true;
        }
        
        return this;
    };
    
    /**
     * Desable event listening on the stage for all or a selected set of events.
     * 
     * @memberOf Stage.prototype
     * @name desableEvents
     * @function
     * @param {Object} events An array of event names to be disabled. Omitting this argument would disable all the enabled events.
     * @returns {Stage} The Stage object
     */
    _stage.desableEvents = function(events) {
        if(Roo.isArray(events)) {
            for(var i = 0; i < events.length; i++) {
                var _evt = events[i];
                switch(_evt) {
                    case 'click':       this.events.click       = false; break;
                    case 'mousedown':   this.events.mousedown   = false; break;
                    case 'mouseup':     this.events.mouseup     = false; break;
                    case 'mousemove':   this.events.mousemove   = false; break;
                    case 'mouseover':   this.events.mouseover   = false; break;
                    case 'mouseout':    this.events.mouseout    = false; break;
                    case 'touchstart':  this.events.touchstart  = false; break;
                    case 'touchend':    this.events.touchend    = false; break;
                    case 'touchmove':   this.events.touchmove   = false; break;
                }
            }
        } else {
            this.events.click       = false;
            this.events.mousedown   = false;
            this.events.mouseup     = false;
            this.events.mousemove   = false;
            this.events.mouseover   = false;
            this.events.mouseout    = false;
            this.events.touchstart  = false;
            this.events.touchend    = false;
            this.events.touchmove   = false;
        }
        
        return this;
    }

    
    /**
	 * The Graphics class provides a basic set of functions that could be used
	 * to handle all the vector drawings on a canvas element.
	 * 
	 * @class Graphics
	 * @constructor
	 */
    function Graphics(width, height) {
        this.canvas = document.createElement('canvas');
        this.context = null;
        this._changeList = null;
        this._init(width, height);
    }

    var _graphics = Graphics.prototype;

    /**
	 * Initialize the Graphics object
	 */
    _graphics._init = function(width, height) {
        this.setSize(width, height);
        // set the context
        if(this.canvas && this.canvas.getContext) {
            this.context = this.canvas.getContext('2d');
        }

        // build a change list
        this._changeList = new Array();

    	this.canvas.style.position = 'absolute';
        // TODO remove this
        // document.getElementById('body').appendChild(this.context.canvas);
    };
    
    _graphics.setSize = function(width, height) {
    	if(typeof width == 'number')
    		this.canvas.width = width;
    	if(typeof height == 'number')
    		this.canvas.height = height;
    };
    
    _graphics.getSize = function() {    	
    	return {width: this.canvas.width, height: this.canvas.height};
    };

	_graphics.clear = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	
	_graphics.beginPath = function() {
		this.context.beginPath();
	};
	
	_graphics.closePath = function() {
		this.context.closePath();
	};
	
	_graphics.moveTo = function(x,y) {
		this.context.moveTo(x,y);
	};
	
	_graphics.lineTo = function(x,y) {
		this.context.lineTo(x,y);
	}
	
    _graphics.draw = function(object) {
        if(!Roo.isDisplayObject(object) || !object.render) {
            return false;
        }
        
        // this.context.save();

        this.copyShapeStyles(object);
        
        // this.context.clearRect(object.cache.x - ((object.cache.width / 2) - 1),
		// object.cache.y - ((object.cache.height / 2) - 1), object.cache.width +
		// 1, object.cache.height + 1);
        //var _cacheBounds = object.getCacheBounds();
        var _changed = object.render(this);
        
        // this.context.restore();
        //if(_changed) {
            //this._changeList.push(_cacheBounds);
            //this._changeList.push(object.getBounds());
        //}
    };

    _graphics.getCanvas = function() {
        return this.canvas;
    };

    _graphics.getContext = function() {
        return this.context;
    };

    _graphics.getChanges = function() {
        return this._changeList;
    };

    _graphics.clearChanges = function() {
        this._changeList.length = 0;
    };
    
    _graphics.appendTo = function(element) {
    	var el = (typeof element == 'string')? document.getElementById(element) : element;
    	if(el && el.appendChild)
    		el.appendChild(this.canvas);
    };
    
    /**
	 * Copy styles of the Shape object to Graphics object
	 * 
	 * @param {Shape}
	 *            shape The shape object to copy styles from
	 */
    _graphics.copyShapeStyles = function(shape) {
        var _shape = new Shape(shape.left, shape.top, shape);

        // transform the shape styles to context styles
        _shape.globalAlpha = _shape.opacity;

        Roo.apply(this.context, _shape, true);
    };
    
    /**
	 * 
	 * 
	 * @class Layer
	 * @param width
	 * @param height
	 * @return
	 */
    function Layer(width, height) {
    	this.stage 		= null;
    	this.listening 	= false;
    	this.objects 	= null;
    	this._init(width, height);
    }
    
    var _layer = Layer.prototype;
    
    _layer._init = function(width, height) {
    	this.graphics 	= new Graphics(width, height);
    	this.objects 	= new Array();
    };
    
    _layer.setSize = function(width, height) {
    	if(typeof width == 'number')
    		this.graphics.canvas.width = width;
    	if(typeof height == 'number')
    		this.graphics.canvas.height = height;
    };
    
    _layer.add = function(objects) {
    	if(Roo.isDisplayObject(objects)) {
    		objects.layer = this;
            this.objects.push(objects);
    		return true;
    	} else if(Roo.isArray(objects)) {
    	    for(var i = 0; i < objects.length; i++) {
    	        var _object = objects[i];
        	    if(Roo.isDisplayObject(_object)) {
                    _object.layer = this;
                    this.objects.push(_object);
                }
            }
            return true;
    	}
    	
    	return false;
    };
    
    _layer.remove = function(objects) {
    	if(Roo.isDisplayObject(objects)) {
    		var _index = this.objects.indexOf(objects);
    		if(_index >= 0) {
	    		objects.layer = null;
	    		this.objects.splice(_index,1);
	    		return true;
    		}
    	} else if(Roo.isArray(objects)) {
    	    for(var i = 0; i < objects.length; i++) {
    	        var _object = objects[i];
    	        if(Roo.isDisplayObject(_object)) {
        	        var _index = this.objects.indexOf(_object);
                    if(_index >= 0) {
                        _object.layer = null;
                        this.objects.splice(_index,1);
                    }
                }
    	    }
            
            return true;
    	}
    	
    	return false;
    };
	
	_layer.update = function() {
		var _objects = this.objects;
		if(_objects.length > 0) {
            var _targets = [];
			this.graphics.clear();
            for(var i = 0; i < _objects.length; i++) {
                var _object = _objects[i];

                //if(Roo.hasChanged(_object))
                this.graphics.draw(_object);
                
                // TODO remove this after testing the bounding box
                /*var _minX = this.stage.width;
                var _minY = this.stage.height;
                var _maxX = 0;
                var _maxY = 0;
                
                for(var i = 0; i < this.stage.width; i++) {
                	for(var j = 0; j < this.stage.height; j++) {
                		if(this.graphics.context.isPointInPath(i, j)) {
                			if(i < _minX)
                				_minX = i;
                			
                			if(i > _maxX)
                				_maxX = i;
                			
                			if(j < _minY)
                				_minY = j;
                			
                			if(j > _maxY)
                				_maxY = j;
                		}
                	}
                }*/
                
                if(this.isListening()) {
                    var _pos = this.stage.getTouchPosition() || this.stage.getMousePosition();
                    if(_pos !== null) {
                    	// TODO remove this after testing
                        if(_object.draggable && _object.dragging && this.stage.events.previousMousePosition !== null) {
                            var _x = _pos.x - this.stage.events.previousMousePosition.x;
                            var _y = _pos.y - this.stage.events.previousMousePosition.y;
                            _object.left += _x;
                            _object.top += _y;
                    	}
                        // drop all the graggable objects in mouseup, mouseout or touchend
                        //if(this.stage.events.type == 'mouseup' || this.stage.events.type == 'mouseout' || this.stage.events.type == 'touchend') {
                            //_object.gragging = false;
                        //}
                        if(this.graphics.context.isPointInPath(_pos.x, _pos.y)) {
                            _targets.push(_object);
                            // console.log('Event - ' + this.stage.events.type  + ' - on a object with color ' + _object.fillStyle);
                            // alert('Event - ' + this.stage.events.type  + ' - on a object with color ' + _object.fillStyle);
                            /*var _x = _pos.x - _object.x;
                             var _y = _pos.y - _object.y;
                             _object.x += _x;
                             _object.y += _y;
                             */
                        }
                    }
                }
            }
            if(_targets.length > 0) {
                while(_targets.length > 0) {
                    var _target = _targets.pop();
                    var _type = this.stage.events.type;
                    var _evt = {
                        target : _target,
                        type : _type,
                        x : _pos.x,
                        y : _pos.y
                    };
                    switch(_type) {
                        case 'click':
                            if(_target.onclick !== null) {
                                _target.onclick(_evt);
                            }
                            break;
                        case 'mousedown':
                            if(_target.onmousedown !== null) {
                                _target.onmousedown(_evt);
                            }
            
                            if(_target.draggable) {
                                _target.dragging = true;
                            }
                            this.stage.events.type = '';
                            break;
                        case 'mouseup':
                            if(_target.onmouseup !== null) {
                                _target.onmouseup(_evt);
                            }
            
                            if(_target.draggable && _target.dragging) {
                                _target.dragging = false;
                            }
                            break;
                        case 'mousemove':
                            if(_target.onmousemove !== null) {
                                _target.onmousemove(_evt);
                            }
            
                            if(_target.draggable) {
                            	this.stage.container.style.cursor = 'pointer';
                            } else {
                            	this.stage.container.style.cursor = 'auto';
                            }
                            break;
                        case 'touchstart':
                            if(_target.touchstart !== null) {
                                _target.touchstart(_evt);
                            }
            
                            if(_target.draggable) {
                                _target.dragging = true;
                            }
                            break;
                        case 'touchend':
                            if(_target.touchend !== null) {
                                _target.touchend(_evt);
                            }
            
                            if(_target.draggable && _target.dragging) {
                                _target.dragging = false;
                            }
                            break;
                        case 'touchmove':
                            if(_target.touchmove !== null) {
                                _target.touchmove(_evt);
                            }
                            break;
                    }
                }
            }
		}
	};
    
    _layer.belongsTo = function(stage) {
    	if(Roo.isStage(stage)) {
    		var _index = stage.layers.indexOf(this);
    		if(_index >= 0) {
    			return true;
    		}
    	}
    	return false;
    };
    
    _layer.moveUp = function() {
    	if(this.belongsTo(this.stage) && this.stage.layers.length > 1) {
    		var _layers = this.stage.layers;
    		// if the layer is already at the top do nothing
    		if(this == _layers[_layers.length - 1])
    			return true;
    		
    		var _container = this.stage.container;
    		var _canvas = this.graphics.canvas;
    		
    		// switch this item with the one above
    		var _index = _layers.indexOf(this);
    		var _itemAbove = _layers[_index + 1];
    		
    		var _canvasAbove = _container.removeChild(_itemAbove.canvas);
    		_container.insertBefore(_canvasAbove, this.graphics.canvas);
    		
    		_layers[_index + 1] = _layers[_index];
    		_layers[_index] = _itemAbove;
    		return true;
    	}
    	return false;
    };
    
    _layer.moveDown = function() {
    	if(this.belongsTo(this.stage) && this.stage.layers.length > 1) {
    		var _layers = this.stage.layers;
    		// if the layer is already at the bottom do nothing
    		if(this == _layers[0])
    			return true;

    		var _container = this.stage.container;
    		var _canvas = this.graphics.canvas;
    		
    		// switch this item with the one below
    		var _index = _layers.indexOf(this);
    		var _itemBelow = _layers[_index - 1];
    		
    		var _canvasBelow = _container.removeChild(_itemBelow.canvas);
    		_container.insertBefore(_canvasBelow, this.graphics.canvas.nextSibling);
    		
    		_layers[_index - 1] = _layers[_index];
    		_layers[_index] = _itemBelow;
    		return true;
    	}
    	return false;
    };
    
    _layer.moveToTop = function() {
    	if(this.belongsTo(this.stage) && this.stage.layers.length > 1) {
    		var _layers = this.stage.layers;
    		// if the layer is already at the top do nothing
    		if(this == _layers[_layers.length - 1])
    			return true;
    		
    		var _container = this.stage.container;
    		var _canvas = this.graphics.canvas;
    		
    		// remove the item from its current position and put it at the end
    		_container.removeChild(_canvas);
    		_container.appendChild(_canvas);
    		
    		var _index = _layers.indexOf(this);
    		var _items = _layers.splice(_index,1);
    		_layers.push(_items[0]);
    		return true;
    	}
    	return false;
    };
    
    _layer.moveToBottom = function() {
    	if(this.belongsTo(this.stage) && this.stage.layers.length > 1) {
    		var _layers = this.stage.layers;
    		// if the layer is already at the bottom do nothing
    		if(this == _layers[0])
    			return true;
    		
    		var _container = this.stage.container;
    		var _canvas = this.graphics.canvas;
    		
    		// remove the item from its current position and put it at the end
    		_container.removeChild(_canvas);
    		_container.insertBefore(_canvas, _layers[0].canvas);
    		
    		var _index = _layers.indexOf(this);
    		var _items = _layers.splice(_index,1);
    		_layers.unshift(_items[0]);
    		return true;
    	}
    	return false;
    };
    
    _layer.startListening = function() {
    	this.listening = true;
    };
    
    _layer.stopListening = function() {
    	this.listening = false;
    };
    
    _layer.isListening = function() {
        return this.listening;
    };
    
    _layer.on = function(event, handler) {
    	this.graphics.canvas.addEventListener(event, handler);
    };
    
    _layer.addEventListener = function(event, handler) {
    	this.on(event, handler);
    };
    
    /**
	 * 
	 * 
	 * @class DisplayObject
	 * @param left
	 * @param top
	 * @param options
	 * @return
	 */
    function DisplayObject(left, top, options) {
        var options =  options || {};
        
        this._rotation		= 0;
        this._scaleX		= 1;
        this._scaleY		= 1;
        this._minX			= Roo.MAX;
        this._minY			= Roo.MAX;
        this._maxX			= 0;
        this._maxY			= 0;
        this._centerX		= 0;
        this._centerY		= 0;
        this._width			= 0;
        this._height		= 0;
        
        this.layer          = null;
        this.left			= 0;
        this.top			= 0;
        
        this.draggable      = false;
        this.dragging       = false;
        
        this.onclick        = null;
        this.onmousedown    = null;
        this.onmouseup      = null;
        this.onmousemove    = null;
        this.touchstart     = null;
        this.touchstop      = null;
        this.touchmove      = null;
        
        this.opacity        = 1;

        // map basic styles of the CanvasRenderingContext2D
        this.fillStyle      = '#000000';
        this.font           = "10px sans-serif";
        this.lineCap        = "butt";
        this.lineJoin       = "miter";
        this.lineWidth      = 1;
        this.miterLimit     = 10;
        this.shadowBlur     = 0;
        this.shadowColor    = "rgba(0, 0, 0, 0)";
        this.shadowOffsetX  = 0;
        this.shadowOffsetY  = 0;
        this.strokeStyle    = "#000000";
        this.textAlign      = "start";
        this.textBaseline   = "alphabetic";

    	this.left 			= left	|| 0;
    	this.top 			= top 	|| 0;
    	this.draggable 		= options.draggable 	|| false;
    	this.onclick 		= options.onclick 		|| null;
        this.onmousedown    = options.onmousedown 	|| null;
        this.onmouseup      = options.onmouseup 	|| null;
        this.onmousemove    = options.onmousemove 	|| null;
        this.touchstart     = options.touchstart 	|| null;
        this.touchstop      = options.touchstop 	|| null;
        this.touchmove      = options.touchmove 	|| null;
        
        this.opacity 		= options.opacity 		|| 1;
        this.shadowBlur     = options.shadowBlur 	|| 0;
        this.shadowColor    = options.shadowColor 	|| "rgba(0, 0, 0, 0)";
        this.shadowOffsetX  = options.shadowOffsetX	|| 0;
        this.shadowOffsetY  = options.shadowOffsetY	|| 0;
    };
    
    var _dobject = DisplayObject.prototype;
    
    _dobject.getLayer = function() {
        return this.layer;
    };
    
    _dobject.scale = function(x, y) {
    	if(typeof x == 'number')
    		this._scaleX = x;
    	if(typeof y == 'number')
    		this._scaleY = y;
    	return this;
    };
	
    _dobject.rotate = function(angle) {
    	if(Roo.isLayer(this.layer)) {
    		this.setRotation(angle);
    		this.layer.update();
    	}
		return this;
    };
    
    _dobject.setRotation = function(angle) {
    	this._rotation = (Math.PI / 180) * angle;
		return this;
    };
    
    _dobject.getRotation = function(angle) {
    	return this._rotation;
    };
    
    _dobject.belongsTo = function(layer) {
        if(Roo.isLayer(layer)) {
            var _index = layer.objects.indexOf(this);
            if(_index >= 0) {
                return true;
            }
        }
        return false;
    };
    
    _dobject.moveUp = function() {
        if(this.belongsTo(this.layer) && this.layer.objects.length > 1) {
            var _objects = this.layer.objects;
            // if the object is already at the top do nothing
            if(this == _objects[_objects.length - 1])
                return this;
            // switch this item with the one above
            var _index = _objects.indexOf(this);
            var _itemAbove = _objects[_index + 1];
            _objects[_index + 1] = _objects[_index];
            _objects[_index] = _itemAbove;
        }
        return this;
    };
    
    _dobject.moveDown = function() {
        if(this.belongsTo(this.layer) && this.layer.objects.length > 1) {
            var _objects = this.layer.objects;
            // if the object is already at the bottom do nothing
            if(this == _objects[0])
                return this;
            // switch this item with the one below
            var _index = _objects.indexOf(this);
            var _itemBelow = _objects[_index - 1];
            _objects[_index - 1] = _objects[_index];
            _objects[_index] = _itemBelow;
        }
        return this;
    };
    
    _dobject.moveToTop = function() {
        if(this.belongsTo(this.layer) && this.layer.objects.length > 1) {
            var _objects = this.layer.objects;
            // if the object is already at the top do nothing
            if(this == _objects[_objects.length - 1])
                return this;
            // remove the item from its current position and put it at the end
            var _index = _objects.indexOf(this);
            var _items = _objects.splice(_index,1);
            _objects.push(_items[0]);
        }
        return this;
    };
    
    _dobject.moveToBottom = function() {
        if(this.belongsTo(this.layer) && this.layer.objects.length > 1) {
            var _objects = this.layer.objects;
            // if the object is already at the bottom do nothing
            if(this == _objects[0])
                return this;
            // remove the item from its current position and put it at the beginning
            var _index = _objects.indexOf(this);
            var _items = _objects.splice(_index,1);
            _objects.unshift(_items[0]);
        }
        return this;
    };
    
    /**
	 * The basic 2D Shape All the objects in 2D space are expected to extend
	 * this class
	 */
    function Shape(left, top, options) {
        var options = options || {};
        DisplayObject.call(this, left, top, options);
        
        this._steps			= new Array();
        
		this._lastX			= 0;
		this._lastY			= 0;

        // map basic styles of the CanvasRenderingContext2D
        this.fillStyle 		= '#000000';
        this.font 			= "10px sans-serif";
        this.lineCap 		= "butt";
        this.lineJoin 		= "miter";
        this.lineWidth 		= 1;
        this.miterLimit 	= 10;
//        this.shadowBlur 	= 0;
//        this.shadowColor 	= "rgba(0, 0, 0, 0)";
//        this.shadowOffsetX 	= 0;
//        this.shadowOffsetY	= 0;
        this.strokeStyle 	= "#000000";
        this.textAlign 		= "start";
        this.textBaseline 	= "alphabetic";


    	this.fillStyle 		= (typeof options.fillStyle !== 'undefined') ? options.fillStyle : '#000000';
        this.lineWidth 		= (typeof options.lineWidth !== 'undefined' && options.lineWidth >= 0) ? options.lineWidth : 1;
        this.lineCap 		= options.lineCap 		|| "butt";
        this.lineJoin 		= options.lineJoin 		|| "miter";
        this.miterLimit 	= options.miterLimit 	|| 10;
        this.strokeStyle 	= options.strokeStyle 	|| "#000000";
        
        if(typeof options.draw != 'undefined')
        	this.draw 			= options.draw;
    };

    var _shape = Shape.prototype = new DisplayObject();
    _shape.constructor = Shape;
    
    _shape.cache = new Object();
    
    _shape._resetGeom = function(x, y) {        
    	if(typeof x == 'number') {
    		if(x > this._maxX)
    			this._maxX = x; 
    		if(x < this._minX)
    			this._minX = x;
    	}
    	
    	if(typeof y == 'number') {
    		if(y > this._maxY)
    			this._maxY = y;
    		if(y < this._minY)
    			this._minY = y;
    	}
    	this._width = this._maxX - this._minX;
    	this._height = this._maxY - this._minY;
    	this._centerX = this._minX + Math.ceil(this._width / 2);
    	this._centerY = this._minY + Math.ceil(this._height / 2);
    };
    
    _shape._clearGeom = function() {
		this._lastX		= 0;
		this._lastY		= 0;
        this._minX		= Roo.MAX;
        this._minY		= Roo.MAX;
        this._maxX		= 0;
        this._maxY		= 0;
        this._centerX	= 0;
        this._centerY	= 0;
        this._width		= 0;
        this._height	= 0;
    };
    
    _shape.beginPath = function() {
		this._clearGeom();
		this._steps.push({f: 'beginPath', params: null});
		return this;
	};
	
	_shape.closePath = function() {
		this._steps.push({f: 'closePath', params: null});
		return this;		
	};
	
	_shape.moveTo = function(x, y) {
		var _x = this.left + x;
		var _y = this.top + y;
		this._lastX = _x;
		this._lastY = _y;
		this._resetGeom(_x, _y);
		this._steps.push({f: 'moveTo', params: [_x, _y]});
		return this;
	};
	
	_shape.lineTo = function(x, y) {
		var _x = this.left + x;
		var _y = this.top + y;
		this._lastX = _x;
		this._lastY = _y;
		this._resetGeom(_x, _y);
		this._steps.push({f: 'lineTo', params: [_x, _y]});
		return this;
	};
	
	_shape.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
		var _x = this.left + x;
		var _y = this.top + y;
		
	    var _cMinX  = _x - radius;
        var _cMinY   = _y - radius;
        var _cMaxX   = _x + radius;
        var _cMaxY   = _y + radius;
		var _startX	= _x + Math.ceil(radius * Math.cos((Math.PI / 180) * startAngle));
		var _startY	= _y + Math.ceil(radius * Math.sin((Math.PI / 180) * startAngle));
		var _endX 	= _x + Math.ceil(radius * Math.cos((Math.PI / 180) * endAngle));
		var _endY 	= _y + Math.ceil(radius * Math.sin((Math.PI / 180) * endAngle));
		
		// find points that intersect the arc and create an angle that divided by 90    
        if(anticlockwise) {
            var _cross0 = Roo.wrapAngle(startAngle) < Roo.wrapAngle(endAngle);
            var _cross90 = Roo.wrapAngle(startAngle - 90) < Roo.wrapAngle(endAngle - 90);
            var _cross180 = Roo.wrapAngle(startAngle - 180) < Roo.wrapAngle(endAngle - 180);
            var _cross270 = Roo.wrapAngle(startAngle - 270) < Roo.wrapAngle(endAngle - 270);
        } else {
            var _cross0 = Roo.wrapAngle(startAngle) > Roo.wrapAngle(endAngle);
            var _cross90 = Roo.wrapAngle(startAngle - 90) > Roo.wrapAngle(endAngle - 90);
            var _cross180 = Roo.wrapAngle(startAngle - 180) > Roo.wrapAngle(endAngle - 180);
            var _cross270 = Roo.wrapAngle(startAngle - 270) > Roo.wrapAngle(endAngle - 270);
        }
        
        var _minX = _cross180 ? _cMinX : Math.min(_startX, _endX);
        var _minY = _cross270 ? _cMinY : Math.min(_startY, _endY);
        var _maxX = _cross0 ? _cMaxX : Math.max(_startX, _endX);
        var _maxY = _cross90 ? _cMaxY : Math.max(_startY, _endY);
		
		this._lastX = _endX;
		this._lastY = _endY;
		this._resetGeom(_minX, _minY);
		this._resetGeom(_maxX, _maxY);
		
		this._steps.push({f: 'arc', params: [_x, _y, radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, anticlockwise]});
		return this;
	};
	
	_shape.arcTo = function(x1, y1, x2, y2, radius) {
		var _x0 = this._lastX;	// the point Q(x0,y0), P(x1,y1), R(x2,y2)
		var _y0 = this._lastY;
		var _x1 = this.left + x1;
		var _y1 = this.top + y1;
		var _x2 = this.left + x2;
		var _y2 = this.top + y2;
		var _radius = radius;
		
		var _anglePQ = Math.atan2(_y0 - _y1, _x0 - _x1);
		var _anglePR = Math.atan2(_y2 - _y1, _x2 - _x1);
		var _anglePC = (_anglePQ + _anglePR) / 2;
		var _angleQPR = _anglePR - _anglePQ;
				
		/* determine whether the arc is drawn CW or CCW
		 * if (anglePR - anglePQ) > PI => angleQPR > PI
		 * OR
		 * if (anglePR - anglePQ) < 0 => angleQPR < 0 AND (anglePR - anglePQ) > -PI => angleQPR > -PI
		 * OR if the angleQPR is in third or fourth quadrant
		 * the arc is drawn CW
		 * if the angleQPR is in first or second quadrant
		 * the arc is drawn CCW
		 */
		if(_angleQPR > Math.PI || (_angleQPR < 0 && _angleQPR > - Math.PI)) {
			_anglePC += Math.PI; // consider the circle drawn at the facing side of the angleQPR
			_angleQPR = 2 * Math.PI - _angleQPR;
			anticlockwise = false;
		} else {
			// swap the anglePQ and angle PR
			var tmp = _anglePQ;
			_anglePQ = _anglePR;
			_anglePR = tmp;
			anticlockwise = true;
		}
		
		_startAngle = _anglePQ + (Math.PI / 2);
		_endAngle = _anglePR - (Math.PI / 2);
		var _angleQPC = _angleQPR / 2;
		
		var _dPQ = Math.sqrt((_x0 - _x1)*(_x0 - _x1)+(_y0 - _y1)*(_y0 - _y1));
		var _dPR = Math.sqrt((_x2 - _x1)*(_x2 - _x1)+(_y2 - _y1)*(_y2 - _y1));
		var _dPC = -1;
		var _sinQPC = Math.sin(_angleQPC);
		var _cosQPC = Math.cos(_angleQPC);
		
		if (Math.abs(_cosQPC) >= 1e-5) { /* the arc may not fit */
			/* min distance of end-points from corner */
			var min_d = _dPQ < _dPR ? _dPQ : _dPR;
			/* max radius of an arc that fits */
			var max_r = min_d * _sinQPC / _cosQPC;
			
			if (_radius > max_r) {
				/* arc with requested radius doesn't fit */
				_radius = max_r;
				_dPC = min_d / _cosQPC; /* distance of C(xc,yc) from P(x1,y1) */
			}
		}
		
		if (_dPC < 0)
			_dPC = _radius / _sinQPC; /* distance of C(xc,yc) from P(x1,y1) */
		
		var _xc = _x1 - _dPC * Math.sin(_anglePC);
		var _yc = _y2 - _dPC * Math.cos(_anglePC);				// the center of the circle C(xc,yc)
		
		// ############ from arc function ###########
		if(anticlockwise) {
		    startAngle = _endAngle / Math.PI * 180;
            endAngle = _startAngle / Math.PI * 180;
		} else {
    		startAngle = _startAngle / Math.PI * 180;
    		endAngle = _endAngle / Math.PI * 180;
		}
		var x = _xc;
		var y = _yc;
		var _cMinX  = _xc - radius;
        var _cMinY   = _yc - radius;
        var _cMaxX   = _xc + radius;
        var _cMaxY   = _yc + radius;
		var _startX	= _xc + Math.ceil(radius * Math.cos((Math.PI / 180) * startAngle));
		var _startY	= _yc + Math.ceil(radius * Math.sin((Math.PI / 180) * startAngle));
		var _endX 	= _xc + Math.ceil(radius * Math.cos((Math.PI / 180) * endAngle));
		var _endY 	= _yc + Math.ceil(radius * Math.sin((Math.PI / 180) * endAngle));
           
        if(anticlockwise) {        
            var _cross0 = Roo.wrapAngle(startAngle) < Roo.wrapAngle(endAngle);
            var _cross90 = Roo.wrapAngle(startAngle - 90) < Roo.wrapAngle(endAngle - 90);
            var _cross180 = Roo.wrapAngle(startAngle - 180) < Roo.wrapAngle(endAngle - 180);
            var _cross270 = Roo.wrapAngle(startAngle - 270) < Roo.wrapAngle(endAngle - 270);
        } else {
            var _cross0 = Roo.wrapAngle(startAngle) > Roo.wrapAngle(endAngle);
            var _cross90 = Roo.wrapAngle(startAngle - 90) > Roo.wrapAngle(endAngle - 90);
            var _cross180 = Roo.wrapAngle(startAngle - 180) > Roo.wrapAngle(endAngle - 180);
            var _cross270 = Roo.wrapAngle(startAngle - 270) > Roo.wrapAngle(endAngle - 270);
        }
        
        var _minX = _cross180 ? _cMinX : Math.min(_startX, _endX);
        var _minY = _cross270 ? _cMinY : Math.min(_startY, _endY);
        var _maxX = _cross0 ? _cMaxX : Math.max(_startX, _endX);
        var _maxY = _cross90 ? _cMaxY : Math.max(_startY, _endY);
        
		this._lastX = _endX;
		this._lastY = _endY;
		
		 this._resetGeom(_minX, _minY);
		this._resetGeom(_maxX, _maxY);
		
		this._steps.push({f: 'arcTo', params: [_x1, _y1, _x2, _y2, radius]});
		
		return this;
	};
	
	_shape.quadraticCurveTo = function(cpx, cpy, x, y) {
		var _cpx = this.left + cpx;
		var _cpy = this.top + cpy;
		var _x = this.left + x;
		var _y = this.top + y;
		var _startX = this._lastX;
		var _startY = this._lastY;
		
		for(var t = 0; t <= 1; t += 0.005) {
			var _tx = Math.pow(1 - t, 2) * _startX + 2 * (1 - t) * t * _cpx + Math.pow(t, 2) * _x;
			var _ty = Math.pow(1 - t, 2) * _startY + 2 * (1 - t) * t * _cpy + Math.pow(t, 2) * _y;
			
			this._resetGeom(_tx, _ty);
		}
		
		this._lastX = _x;
		this._lastY = _y;
		this._resetGeom(_x, _y);
		this._steps.push({f: 'quadraticCurveTo', params: [_cpx, _cpy, _x, _y]});
		return this;
	};
	
	_shape.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
		var _cp1x = this.left + cp1x;
		var _cp1y = this.top + cp1y;
		var _cp2x = this.left + cp2x;
		var _cp2y = this.top + cp2y;
		var _x = this.left + x;
		var _y = this.top + y;
		var _startX = this._lastX;
		var _startY = this._lastY;
		
		for(var t = 0; t <= 1; t += 0.005) {
			var _tx = Math.pow(1 - t, 3) * _startX + 3 * Math.pow((1 - t), 2) * t * _cp1x + 3 * (1 - t) * Math.pow(t, 2) * _cp2x + Math.pow(t, 3) * _x;
			var _ty = Math.pow(1 - t, 3) * _startY + 3 * Math.pow((1 - t), 2) * t * _cp1y + 3 * (1 - t) * Math.pow(t, 2) * _cp2y + Math.pow(t, 3) * _y;
			
			this._resetGeom(_tx, _ty);
		}
		
		this._lastX = _x;
		this._lastY = _y;
		this._resetGeom(_x, _y);
		this._steps.push({f: 'bezierCurveTo', params: [_cp1x, _cp1y, _cp2x, _cp2y, _x, _y]});
		return this;
	};
	
	_shape.rect = function(x,y, width, height) {
		var _x = this.left + x;
		var _y = this.top + y;
		this._lastX = _x+width;
		this._lastY = _y + height;
		this._resetGeom(_x, _y);
		this._resetGeom(this._lastX, this._lastY);
		this._steps.push({f: 'rect', params: [_x, _y, width, height]});
		return this;
	};
	
	_shape.fill = function(x,y, width, height) {
		this._steps.push({f: 'fill', params: null});
		return this;
	};
	
	_shape.stroke = function(x,y, width, height) {
		this._steps.push({f: 'stroke', params: null});
		return this;
	};
    
    _shape.render = function(graphics) {
    	var _g = graphics;
    	this._clearGeom();
    	this.draw();
    	
        if(this.fillStyle != null) {
            this.fill();
        }

        if(this.lineWidth > 0 && this.strokeStyle != null) {
            this.stroke()
        }
        
    	var _steps = this._steps;
    	for(var i = 0; i < _steps.length; i++) {
    		var _step = _steps[i];
    		if(typeof _step.params != 'undefined' && Roo.isArray(_step.params)) {
    			_g.context[_step.f].apply(_g.context, _step.params);
    		} else {
    			_g.context[_step.f].apply(_g.context);
    		}
    	}
    	
    	this._steps = [];
		return this;
    };
    
    /**
     * Paints the shape into the given context without updating the cache
     * @param {CanvasRenderingContext2D} context The context object the shape should be drawn to
     */
    _shape._paint = function(context) {
    	// Drawing instructions of the shape should go here
    };
    
    /**
     * Draws the shape into the given context and update the cache
     * 
     * @param {CanvasRenderingContext2D} context The context object the shape should be drawn to
     */
    _shape.draw = function(context) {
    	this._paint(context);
        return this.updateCache();
    };

    _shape.updateCache = function() {
    	this._changed = Roo.cache(this);
        return this._changed;
    };
    
    _shape.isChanged = function() {
    	if(this._changed) {
    		return true;
    	} else {
    		this._changed = Roo.hasChanged(this);
    		return this._changed;
    	}
    };
    
    
    
    function Image(src, left, top, options) {
        var options = options || {};
        DisplayObject.call(this, left, top, options);
        
        this.source = null;
        
        this._init(src, options);
    }
    
    var _image = Image.prototype = new DisplayObject();
    _image.constructor = Image;
    
    _image._init = function(src, options) {
    	if(typeof src == 'string') {
    		this.source = new window.Image();
    		this.source.src = src;
    	} else {
    		this.source = src;
    	}
    	
    	this.source.onload = function() {
    		    		
    	};
    };
    
    _image.draw = function() {
    	
    };
    
    _image.render = function(graphics) {
    	var _g = graphics;
    	this._width = this.source.width;
    	this._height = this.source.height;
    	_g.context.drawImage(this.source, this.left, this.top);
    	_g.beginPath();
    	_g.context.rect(this.left, this.top, this._width, this._height);
    	_g.context.closePath();
		return this;
    };
    
    function Text(text, left, top, options) {
    	var options = options || {};
        DisplayObject.call(this, left, top, options);
        
        this.string = text || '';
        

        this.font           = "20px sans-serif";
        this.textAlign      = "start";
        this.textBaseline   = "alphabetic";
        
    	this.fillStyle 		= (typeof options.fillStyle !== 'undefined') ? options.fillStyle : '#000000';
        this.lineWidth 		= (typeof options.lineWidth !== 'undefined' && options.lineWidth >= 0) ? options.lineWidth : 1;
        this.strokeStyle 	= options.strokeStyle 	|| "#000000";
        //this._init(text, options);
    }
    
    var _text = Text.prototype = new DisplayObject();
    _text.constructor = Text;
    
    _text._init = function(text, options) {
    	this.string = text;
    };
    
    _text.render = function(graphics) {
    	var _g = graphics;
    	
        if(this.fillStyle != null) {
            _g.context.fillText(this.string, this.left, this.top);
        }

        if(this.lineWidth > 0 && this.strokeStyle != null) {
        	_g.context.strokeText(this.string, this.left, this.top)
        }
    	
        return this;
    };
    
    /**
	 * 2D Rectangle
	 */
    function Rectangle(left, top, width, height, options) {
        options = options || {};
        Shape.call(this, left, top, options);
        this.width = width || 0;
        this.height = height || 0;
    };

    var _rectangle = Rectangle.prototype = new Shape();
    _rectangle.constructor = Rectangle;

    /**
	 * Overriding the draw method in Shape
	 */
    _rectangle.draw = function() {
        this.beginPath();
        this.rect(0, 0, this.width, this.height);
    };
    
    /**
	 * 2D Polygon
	 */
    function Polygon(options) {
        options = ( typeof options != 'object') ? {} : options;

        // an array of points - a point is again an array with x, y values
        this.points;
        this.draw = function() {
            if(this.scene && this.scene.graphics) {
                var g = this.scene.graphics;

                if(Roo.isArray(this.points)) {
                    // set the styles of graphics object to style of the shape
                    g.setShapeStyles(this);

                    g.beginPath();
                    // TODO draw polygon

                    g.stroke();
                    if(this.fill) {
                        g.fill();
                    }
                    g.closePath();
                }
            }
        };
        /**
		 * Returns the Bounding Box of the polygon. Bounding Box is a Shape
		 * object which covers the whole drawing area of the polygon.
		 */
        this.getBoundingBox = function() {
            // find the width, height and center of the polygon
            var _x, _y, _width, _height;

            return new Rectangle({
                x : _x,
                y : _y,
                width : _width,
                height : _height,
                fill : false,
                scene : this.scene
            });
        };
        return Roo.extend(this, options, true);
    };

    // inherit from Shape
    Polygon.prototype = new Shape();
    // set the constructor
    Polygon.prototype.constructor = Polygon;

    /**
	 * The public functions
	 */
    Roo.Stage = Stage;
    Roo.Graphics = Graphics;
    Roo.Layer = Layer;
    Roo.Shape = Shape;
    Roo.Image = Image;
    Roo.Text = Text;
    Roo.Rectangle = Rectangle;
    Roo.Polygon = Polygon;

    if(!window.Roo)
        window.Roo = Roo;

//})(window);
