/ *!
 * Javascript Cookie v1.5.1
 * https://github.com/js-cookie/js-cookie
 * *
 * Copyright 2006, 2014 Klaus Hartl
 * Publicado bajo la licencia MIT
 * /
(función (fábrica) {
	var jQuery;
	if (typeof define === 'función' && define.amd) {
		// AMD (Registrarse como un módulo anónimo)
		define (['jquery'], fábrica);
	} else if (typeof exportaciones === 'objeto') {
		// Nodo / CommonJS
		tratar {
			jQuery = require ('jquery');
		} captura (e) {}
		module.exports = factory (jQuery);
	} más {
		// Globales del navegador
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory (window.jQuery);
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			volver api;
		};
	}
} (función ($) {

	var pluses = / \ + / g;

	función codificar (s) {
		volver api.raw? s: encodeURIComponent (s);
	}

	función decodificación (s) {
		volver api.raw? s: decodeURIComponent (s);
	}

	función stringifyCookieValue (valor) {
		return encode (api.json? JSON.stringify (value): String (value));
	}

	función parseCookieValue (s) {
		if (s.indexOf ('"') === 0) {
			// Esta es una cookie citada según RFC2068, unescape ...
			s = s.slice (1, -1) .replace (/ \\ "/ g, '"') .replace (/ \\\\ / g, '\\');
		}

		tratar {
			// Reemplazar las ventajas escritas del lado del servidor con espacios.
			// Si no podemos decodificar la cookie, ignórela, es inutilizable.
			// Si no podemos analizar la cookie, ignórela, es inutilizable.
			s = decodeURIComponent (s.replace (más, ''));
			volver api.json? JSON.parse (s): s;
		} captura (e) {}
	}

	función de lectura (s, convertidor) {
		valor var = api.raw? s: parseCookieValue (s);
		return isFunction (convertidor)? convertidor (valor): valor;
	}

	función extender () {
		clave var, opciones;
		var i = 0;
		resultado var = {};
		para (; i <argumentos.length; i ++) {
			opciones = argumentos [i];
			para (ingrese las opciones) {
				resultado [clave] = opciones [clave];
			}
		}
		resultado de retorno;
	}

	function isFunction (obj) {
		return Object.prototype.toString.call (obj) === '[Función de objeto]';
	}

	var api = función (clave, valor, opciones) {

		// Escribir

		if (argumentos.length> 1 &&! isFunction (value)) {
			opciones = extender (api.defaults, opciones);

			if (typeof options.expires === 'número') {
				var days = options.expires, t = options.expires = new Date ();
				t.setMilliseconds (t.getMilliseconds () + días * 864e + 5);
			}

			return (document.cookie = [
				codificar (clave), '=', stringifyCookieValue (valor),
				opciones.expira? '; expires = '+ options.expires.toUTCString ():' ', // usa el atributo expires, IE no admite max-age
				opciones.ruta? '; ruta = '+ opciones.ruta:' ',
				opciones.domain? '; dominio = '+ opciones.dominio:' ',
				opciones.secure? '; seguro ':' '
			].unirse(''));
		}

		// Leer

		var resultado = clave? indefinido: {},
			// Para evitar el bucle for en primer lugar, asigne una matriz vacía
			// en caso de que no haya cookies en absoluto. También evita resultados extraños cuando
			// llamando a "get ()".
			cookies = document.cookie? document.cookie.split (';'): [],
			i = 0,
			l = longitud de las cookies;

		para (; i <l; i ++) {
			var parts = cookies [i] .split ('='),
				nombre = decodificar (parts.shift ()),
				cookie = parts.join ('=');

			if (clave === nombre) {
				// Si el segundo argumento (valor) es una función, es un convertidor ...
				resultado = leer (cookie, valor);
				descanso;
			}

			// Evita almacenar una cookie que no pudimos decodificar.
			if (! key && (cookie = read (cookie))! == undefined) {
				resultado [nombre] = cookie;
			}
		}

		resultado de retorno;
	};

	api.get = api.set = api;
	api.defaults = {};

	api.remove = function (clave, opciones) {
		// No debe alterar las opciones, extendiendo así un objeto nuevo ...
		api (clave, '', extender (opciones, {caduca: -1}));
		return! api (clave);
	};

	si ($) {
		$ .cookie = api;
		$ .removeCookie = api.remove;
	}

	volver api;
}));
