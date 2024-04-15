$(document).ready(function(){

	// polyfills

	if (!Array.from) {
	  Array.from = (function() {
	    var toStr = Object.prototype.toString;
	    var isCallable = function(fn) {
	      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
	    };
	    var toInteger = function (value) {
	      var number = Number(value);
	      if (isNaN(number)) { return 0; }
	      if (number === 0 || !isFinite(number)) { return number; }
	      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	    };
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	    var toLength = function (value) {
	      var len = toInteger(value);
	      return Math.min(Math.max(len, 0), maxSafeInteger);
	    };

	    // Свойство length метода from равно 1.
	    return function from(arrayLike/*, mapFn, thisArg */) {
	      // 1. Положим C равным значению this.
	      var C = this;

	      // 2. Положим items равным ToObject(arrayLike).
	      var items = Object(arrayLike);

	      // 3. ReturnIfAbrupt(items).
	      if (arrayLike == null) {
	        throw new TypeError('Array.from requires an array-like object - not null or undefined');
	      }

	      // 4. Если mapfn равен undefined, положим mapping равным false.
	      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
	      var T;
	      if (typeof mapFn !== 'undefined') {
	        // 5. иначе
	        // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
	        if (!isCallable(mapFn)) {
	          throw new TypeError('Array.from: when provided, the second argument must be a function');
	        }

	        // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
	        if (arguments.length > 2) {
	          T = arguments[2];
	        }
	      }

	      // 10. Положим lenValue равным Get(items, "length").
	      // 11. Положим len равным ToLength(lenValue).
	      var len = toLength(items.length);

	      // 13. Если IsConstructor(C) равен true, то
	      // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
	      //     объекта C со списком аргументов, содержащим единственный элемент len.
	      // 14. a. Иначе, положим A равным ArrayCreate(len).
	      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

	      // 16. Положим k равным 0.
	      var k = 0;
	      // 17. Пока k < len, будем повторять... (шаги с a по h)
	      var kValue;
	      while (k < len) {
	        kValue = items[k];
	        if (mapFn) {
	          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	        } else {
	          A[k] = kValue;
	        }
	        k += 1;
	      }
	      // 18. Положим putStatus равным Put(A, "length", len, true).
	      A.length = len;
	      // 20. Вернём A.
	      return A;
	    };
	  }());
	}

	/*TABS*/

	$('.tabs__switch').click(function() {
		var dataTab = $(this).data('tab');

		$(this).addClass('active');
		$(this).siblings('.tabs__switch').removeClass('active');
		$(this).parents('.tabs__wrap').find('.tab').not('[data-tab="' + dataTab + '"]').hide();
		$(this).parents('.tabs__wrap').find('.tab[data-tab="' + dataTab + '"]').show();
		$(this).parents('.tabs__wrap').find('.tab').not('[data-tab="' + dataTab + '"]').removeClass('active');
		$(this).parents('.tabs__wrap').find('.tab[data-tab="' + dataTab + '"]').addClass('active');
	});

	$('.tabs__switch.active').each(function() {

		var dataTab = $(this).data('tab');

		$(this).parents('.tabs__wrap').find('.tab').not('[data-tab="' + dataTab + '"]').removeClass('active').hide();
		$(this).parents('.tabs__wrap').find('.tab[data-tab="' + dataTab + '"]').addClass('active').show();
	});

	/*TABS-END*/

	/*POPUPS*/

	$('.overlay, .popup__close').click(function(){
    	$('.popup, .popup__reminder').fadeOut();
    	$('.overlay').fadeOut();
    	$('html').removeClass('overflow-hidden');
    });

    $('.get__callback__popup').click(function(){
    	$('.overlay').fadeIn();
    	$('.callback__popup').fadeIn();
    });

	/*POPUPS-END*/

	$('.input__phone').inputmask({
		"mask": "8 (999) 999-99-99",
		"clearIncomplete": true,
		"onincomplete": function() {
			$(this).parents('form').find('button').attr("disabled", true), $(this).addClass('input-error')
		},
		"oncomplete": function() {
			$(this).parents('form').find('button').attr("disabled", false), $(this).removeClass('input-error')
		}
	});

	var offerTabsSwitch = Array.from(document.querySelectorAll('.offer__tabs__switch'));

  	offerTabsSwitch.map(function (el) {
  		el.addEventListener('click', function(e) {
  			if (window.innerWidth < 992) {
		  		e.preventDefault();
		  		scrollTo({
		  			top:getOffset(document.querySelector('.offer__tabs')).top - 15,
		  			behavior: 'smooth'
	  		});
  		}});
  	});

  	if ($(window).width() < 768) {
    	var animation_start = 100
    	var animation_end = 0
    } else {
    	var animation_start = 250
    	var animation_end = 0
    }

  	var $animation_elements = $('.animation-mark');
    var $window = $(window);

    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);

      // console.log(window_top_position);
     
      $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position - animation_end >= window_top_position) &&
            (element_top_position + animation_start <= window_bottom_position)) {
          	$element.addClass('animate');
        } else {
        	$element.removeClass('animate');
        }
      });
    }	

    $window.on('scroll', check_if_in_view);
    $window.trigger('scroll');

  	function getOffset(el) {
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	}

	( function ( document, window, index ) {
		var inputs = document.querySelectorAll( '.inputfile' );
		Array.prototype.forEach.call( inputs, function( input )
		{
			var label	 = input.nextElementSibling,
				labelVal = label.innerHTML;

			input.addEventListener( 'change', function( e )
			{
				var fileName = '';
				if( this.files && this.files.length > 1 )
					fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
				else
					fileName = e.target.value.split( '\\' ).pop();

				if( fileName )
					label.querySelector( 'span' ).innerHTML = fileName;
				else
					label.innerHTML = labelVal;
			});

			// Firefox bug fix
			input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
			input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
		});
	}( document, window, 0 ));
});