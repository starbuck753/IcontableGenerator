/**
 * Really Simple Color Picker in jQuery
 * 
 * Copyright (c) 2008 Lakshan Perera (www.laktek.com)
 * Licensed under the MIT (MIT-LICENSE.txt)  licenses.
 * 
 */

(function($){
  $.fn.colorPicker = function(){    
    if(this.length > 0) buildSelector();
    return this.each(function(i) { buildPicker(this)}); 
  };

  var selectorOwner;
  var selectorShowing = false;
  
  buildPicker = function(element){
    //build color picker
    control = $("<div class='color_picker'></div>")
    control.css('background-color', $(element).val());
    
    //bind click event to color picker
    control.bind("click", toggleSelector);
    
    //add the color picker section
    $(element).before(control);
    
    //hide the input box
    $(element).hide();
  };
  
  buildSelector = function(){
     selector = $("<div id='_color_selector'></div>");
     
     //add color pallete
     $.each($.fn.colorPicker.defaultColors, function(i){
      swatch = $("<div class='_color_swatch'></div>");
      swatch.css("background-color", "#" + this);
      swatch.bind("click", function(e){ changeColor($(this).css("background-color")) });
      swatch.bind("mouseover", function(e){ 
        $(this).css("border-color", "#598FEF"); 
        $("input#_color_value").val(toHex($(this).css("background-color")));    
        }); 
      swatch.bind("mouseout", function(e){ 
        $(this).css("border-color", "#000");
        $("input#_color_value").val(toHex($(selectorOwner).css("background-color")));
        });
      
      swatch.appendTo(selector);
     });
  
     //add HEX value field
     hex_field = $("<label for='_color_value'>Hex</label><input type='text' size='8' id='_color_value'/>");
     hex_field.bind("keydown", function(event){
      if(event.keyCode == 13) {changeColor($(this).val());}
      if(event.keyCode == 27) {toggleSelector()}
     });
     
     $("<div id='_color_custom'></div>").append(hex_field).appendTo(selector);
               
     $("body").append(selector); 
     selector.hide();
  };
  
  checkMouse = function(event){
    //check the click was on selector itself or on selectorOwner
    var selector = "div#_color_selector";
    var selectorParent = $(event.target).parents(selector).length;
    if(event.target == $(selector)[0] || event.target == selectorOwner || selectorParent > 0) return
    
    hideSelector();   
  }
  
  hideSelector = function(){
    var selector = $("div#_color_selector");
    
    $(document).unbind("mousedown", checkMouse);
    selector.hide();
    selectorShowing = false
  }
  
  showSelector = function(){
    var selector = $("div#_color_selector");
    
    selector.css({
      top: $(selectorOwner).offset().top + ($(selectorOwner).outerHeight()),
      left: $(selectorOwner).offset().left
    }); 
    hexColor = $(selectorOwner).next("input").val();
    $("input#_color_value").val(hexColor);
    selector.show();
    
    //bind close event handler
    $(document).bind("mousedown", checkMouse);
    selectorShowing = true 
   }
  
  toggleSelector = function(event){
    selectorOwner = this; 
    selectorShowing ? hideSelector() : showSelector();
  }
  
  changeColor = function(value){
    if(selectedValue = toHex(value)){
      $(selectorOwner).css("background-color", selectedValue);
      $(selectorOwner).next("input").val(selectedValue).change();
    
      //close the selector
      hideSelector();    
    }
  };
  
  //converts RGB string to HEX - inspired by http://code.google.com/p/jquery-color-utils
  toHex = function(color){
    //valid HEX code is entered
    if(color.match(/[0-9a-fA-F]{3}$/) || color.match(/[0-9a-fA-F]{6}$/)){
      color = (color.charAt(0) == "#") ? color : ("#" + color);
    }
    //rgb color value is entered (by selecting a swatch)
    else if(color.match(/^rgb\(([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5]),[ ]{0,1}([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5]),[ ]{0,1}([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5])\)$/)){
      var c = ([parseInt(RegExp.$1),parseInt(RegExp.$2),parseInt(RegExp.$3)]);
      
      var pad = function(str){
            if(str.length < 2){
              for(var i = 0,len = 2 - str.length ; i<len ; i++){
                str = '0'+str;
              }
            }
            return str;
      }

      if(c.length == 3){
        var r = pad(c[0].toString(16)),g = pad(c[1].toString(16)),b= pad(c[2].toString(16));
        color = '#' + r + g + b;
      }
    }
    else color = false;
    
    return color
  }

  
  //public methods
  $.fn.colorPicker.addColors = function(colorArray){
    $.fn.colorPicker.defaultColors = $.fn.colorPicker.defaultColors.concat(colorArray);
  };
  
  $.fn.colorPicker.defaultColors = ['000000', '333333', '444444', '555555', '777777', '888888', '999999', 'BBBBBB', 'CCCCCC', 'DDDDDD', 'FFFFFF', '000011', '000033', '000044', '000055', '000077', '000088', '000099', '0000BB', '0000CC', '0000DD', '0000FF', '001100', '003300', '004400', '005500', '007700', '008800', '009900', '00BB00', '00CC00', '00DD00', '00FF00', '110000', '330000', '440000', '550000', '770000', '880000', '990000', 'BB0000', 'CC0000', 'DD0000', 'FF0000', '001111', '003333', '004444', '005555', '007777', '008888', '009999', '00BBBB', '00CCCC', '00DDDD', '00FFFF', '111100', '333300', '444400', '555500', '777700', '888800', '999900', 'BBBB00', 'CCCC00', 'DDDD00', 'FFFF00', '110011', '330033', '440044', '550055', '770077', '880088', '990099', 'BB00BB', 'CC00CC', 'DD00DD', 'FF00FF'];


	//$.fn.colorPicker.defaultColors = ['000000', '993300','333300', '000080', '333399', '333333', '800000', 'FF6600', '808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900', '99CC00', '339966', '33CCCC', '3366FF', '800080', '999999', 'FF00FF', 'FFCC00', 'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99', 'FFFF99' , 'CCFFFF', '99CCFF', 'FFFFFF'];
  
})(jQuery);


