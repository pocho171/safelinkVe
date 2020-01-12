/ * ================================================ ===========
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspirado en el jQuery.tipsy original de Jason Frame
 * ================================================= ==========
 * Copyright 2012 Twitter, Inc.
 * *
 * Licenciado bajo la Licencia Apache, Versión 2.0 (la "Licencia");
 * no puede usar este archivo excepto en cumplimiento con la Licencia.
 * Puede obtener una copia de la Licencia en
 * *
 * http://www.apache.org/licenses/LICENSE-2.0
 * *
 * A menos que lo exija la ley aplicable o se acuerde por escrito, el software
 * distribuido bajo la Licencia se distribuye "TAL CUAL",
 * SIN GARANTÍAS O CONDICIONES DE NINGÚN TIPO, ya sea expresa o implícita.
 * Consulte la Licencia para ver los permisos específicos de idioma y
 * limitaciones bajo la Licencia.
 * ================================================= ========= * /


! función ($) {

  "uso estricto"; // jshint; _;


 / * DEFINICIÓN DE CLASE PÚBLICA DE TOOLTIP
  * =============================== * /

  var Tooltip = function (elemento, opciones) {
    this.init ('información sobre herramientas', elemento, opciones)
  }

  Tooltip.prototype = {

    constructor: información sobre herramientas

  , init: función (tipo, elemento, opciones) {
      var eventIn
        , eventOut

      this.type = type
      esto. $ element = $ (elemento)
      this.options = this.getOptions (opciones)
      this.enabled = true

      if (this.options.trigger! = 'manual') {
        eventIn = this.options.trigger == 'hover'? 'mouseenter': 'foco'
        eventOut = this.options.trigger == 'hover'? 'mouseleave': 'desenfoque'
        this. $ element.on (eventIn, this.options.selector, $ .proxy (this.enter, this))
        this. $ element.on (eventOut, this.options.selector, $ .proxy (this.leave, this))
      }

      this.options.selector?
        (this._options = $ .extend ({}, this.options, {trigger: 'manual', selector: ''})):
        this.fixTitle ()
    }

  , getOptions: function (opciones) {
      opciones = $ .extend ({}, $ .fn [this.type] .defaults, opciones, this. $ element.data ())

      if (options.delay && typeof options.delay == 'número') {
        opciones.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      opciones de devolución
    }

  , ingrese: función (e) {
      var self = $ (e.currentTarget) [this.type] (this._options) .data (this.type)

      if (! self.options.delay ||! self.options.delay.show) devuelve self.show ()

      clearTimeout (this.timeout)
      self.hoverState = 'en'
      this.timeout = setTimeout (function () {
        if (self.hoverState == 'in') self.show ()
      }, self.options.delay.show)
    }

  , deje: función (e) {
      var self = $ (e.currentTarget) [this.type] (this._options) .data (this.type)

      if (this.timeout) clearTimeout (this.timeout)
      if (! self.options.delay ||! self.options.delay.hide) devuelve self.hide ()

      self.hoverState = 'fuera'
      this.timeout = setTimeout (function () {
        if (self.hoverState == 'fuera') self.hide ()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $ tip
        , dentro
        pos
        , actualWidth
        realHeight
        , colocación
        tp

      if (this.hasContent () && this.enabled) {
        $ tip = this.tip ()
        this.setContent ()

        if (this.options.animation) {
          $ tip.addClass ('fade')
        }

        colocación = typeof this.options.placement == 'función'?
          this.options.placement.call (this, $ tip [0], this. $ element [0]):
          this.options.placement

        inside = /in/.test(placement)

        $ propina
          .eliminar()
          .css ({arriba: 0, izquierda: 0, pantalla: 'bloque'})
          .appendTo (dentro? this. $ element: document.body)

        pos = this.getPosition (dentro)

        actualWidth = $ tip [0] .offsetWidth
        actualHeight = $ tip [0] .offsetHeight

        interruptor (dentro? ubicación.split ('') [1]: ubicación) {
          caso 'inferior':
            tp = {top: pos.top + pos.height, izquierda: pos.left + pos.width / 2 - actualWidth / 2}
            descanso
          caso 'superior':
            tp = {top: pos.top - actualHeight, izquierda: pos.left + pos.width / 2 - actualWidth / 2}
            descanso
          caso 'izquierda':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, izquierda: pos.left - actualWidth}
            descanso
          caso 'correcto':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, izquierda: pos.left + pos.width}
            descanso
        }

        $ propina
          .css (tp)
          .addClass (ubicación)
          .addClass ('en')
      }
    }

  , isHTML: function (texto) {
      // lógica de detección de cadenas html adaptada de jQuery
      return typeof text! = 'cadena'
        || (text.charAt (0) === "<"
          && text.charAt (text.length - 1) === ">"
          && text.length> = 3
        ) || /^(?:[^<font>*<[\w\Wfont>+>[^>font>*$)/.exec(text)
    }

  , setContent: function () {
      var $ tip = this.tip ()
        , title = this.getTitle ()

      $ tip.find ('. tooltip-inner') [this.isHTML (título)? 'html': 'texto'] (título)
      $ tip.removeClass ('desvanecerse en la parte superior inferior izquierda derecha')
    }

  , hide: function () {
      var that = this
        , $ tip = this.tip ()

      $ tip.removeClass ('en')

      función removeWithAnimation () {
        var timeout = setTimeout (function () {
          $ tip.off ($. support.transition.end) .remove ()
        }, 500)

        $ tip.one ($. support.transition.end, function () {
          clearTimeout (tiempo de espera)
          $ tip.remove ()
        })
      }

      $ .support.transition && this. $ tip.hasClass ('fade')?
        removeWithAnimation ():
        $ tip.remove ()
    }

  , fixTitle: function () {
      var $ e = this. $ element
      if ($ e.attr ('title') || typeof ($ e.attr ('data-original-title'))! = 'string') {
        $ e.attr ('título-original-datos', $ e.attr ('título') || '') .removeAttr ('título')
      }
    }

  , hasContent: function () {
      devuelve this.getTitle ()
    }

  , getPosition: function (inside) {
      return $ .extend ({}, (inside? {top: 0, left: 0}: this. $ element.offset ()), {
        ancho: este. $ elemento [0] .offsetWidth
      , height: this. $ element [0] .offsetHeight
      })
    }

  , getTitle: function () {
      título var
        , $ e = esto. $ elemento
        , o = this.options

      title = $ e.attr ('data-original-title')
        || (typeof o.title == 'function'? o.title.call ($ e [0]): o.title)

      título de retorno
    }

  , consejo: función () {
      devuelva esto. $ tip = this. $ tip || $ (this.options.template)
    }

  , validar: función () {
      if (! this. $ element [0] .parentNode) {
        this.hide ()
        this. $ element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , deshabilitar: función () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled =! this.enabled
    }

  , alternar: función () {
      this [this.tip (). hasClass ('in')? 'ocultar mostrar']()
    }

  }


 / * DEFINICIÓN DE PLUGIN DE TOOLTIP
  * ========================= * /

  $ .fn.tooltip = función (opción) {
    devuelve this.each (function () {
      var $ this = $ (this)
        , data = $ this.data ('información sobre herramientas')
        , options = typeof option == 'object' && option
      if (! data) $ this.data ('tooltip', (data = new Tooltip (this, options)))
      if (typeof option == 'string') data [opción] ()
    })
  }

  $ .fn.tooltip.Constructor = Información sobre herramientas

  $ .fn.tooltip.defaults = {
    animación: cierto
  , ubicación: 'top'
  , selector: falso
  , template: '<div class = "tooltip"> <div class = "tooltip-arrow"> </div> <div class = "tooltip-inner"> </div> </div>'
  , disparador: 'desplazar'
  , título: ''
  , retraso: 0
  }

} (window.jQuery);
