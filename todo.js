

$(document).ready(function() {
  
  let toDoList = document.getElementById('toDo');

  $("#addNew").on('keypress', function(event) {

    newItem = $("#addNew");

    if (event.which == 13 && newItem.val().length > 0) {
      event.preventDefault();

      num = $('#toDo').children().length;

      newTodo = '<li class="newTodo" ><input id="itemCheck' + num + '" type="checkbox"><label class="itemLabel" for="itemCheck' + num + '"><span><img src="images/icon-check.svg"></span></label>';
      
      newTodo += '<span>' + newItem.val() + '</span>';
      
      newTodo += '<span class="cancel"><img src="images/icon-cross.svg"></span></li>';

      newItem.val('');

      $('#toDo').append(newTodo);
 slist(toDoList);

      
  //add scroll

  var listItems = $('#toDo').children();

  if (listItems.length >= 5) {
    $('#toDo').addClass('scroll');
  }

    }

    //update remaining items
    updateRemaining();

  });

  //THEME
  //Switch to dark theme

  $('#iconMoon').on('click', function() {

    $('#headImagelight').attr('src', 'images/bg-mobile-dark.jpg');

    $('#container').css('background', 'hsl(235, 21%, 11%)');

    $('#add, #list, #filters, input').css('background', 'hsl(235, 24%, 19%)');

    $('body, input').css('color', 'white');
    
    $("#iconMoon, #iconSun").toggle();
  });

  //Switch to light theme

  $('#iconSun').on('click', function() {

    $('#headImagelight').attr('src', 'images/bg-mobile-light.jpg');

    $('#container').css('background', 'hsla(0, 0%, 50%, 0.11)');

    $('#add, #list, #filters, input').css('background', 'white');

    $('body, input').css('color', 'black');

    $("#iconMoon, #iconSun").toggle();
  });

  //delete items

  $("#toDo").on('click', '.cancel', function() {

    $(this).parent().fadeOut(300).remove();

    //update remaining items
    updateRemaining();

  });

  //clear completed

  $("#clear").on('click', function() {

    $("#toDo .newTodo input:checked").parent().remove();

    //update remaining items
    updateRemaining();

  });


  //show all

  $('.all').on('click', function() {

    inputs = $('#toDo .newTodo').find('input');

    inputs.each(function() {

        $(this).parent().fadeIn(300);

    });

  });


  //show active

  $('.active').on('click', function() {

    done = $('#toDo .newTodo').find('input:checked');

    inputs = $('#toDo .newTodo').find('input');

    if (inputs.length != done.length) {


      inputs.each(function() {

        if ($(this).prop('checked')) {

          $(this).parent().fadeOut(300);

        } else {

          $(this).parent().delay(300).fadeIn(300);

        }

      });

    }

  });


  //show completed

  $('.completed').on('click', function() {

    done = $('#toDo .newTodo').find('input:checked');

    inputs = $('#toDo .newTodo').find('input');

    if (done.length != 0) {

      inputs.each(function() {

        if (!$(this).prop('checked')) {

          $(this).parent().fadeOut(300);

        } else {

          $(this).parent().delay(300).fadeIn(300);

        }

      });

    }

  });
/*
jjghhjjnb
bgffghjnj
mbgfuuhhhj
vgionjjkkk
ghoogghhhb
*/





function slist (target) {
  // (A) SET CSS + GET ALL LIST ITEMS
  target.classList.add("slist");
  let items = target.getElementsByTagName("li"), current = null;

  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  for (let i of items) {
    // (B1) ATTACH DRAGGABLE
    i.draggable = true;
    
    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.ondragstart = (ev) => {
      current = i;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    };
    
    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.ondragenter = (ev) => {
      if (i != current) { i.classList.add("active"); }
    };

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.ondragleave = () => {
      i.classList.remove("active");
    };

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.ondragend = () => { for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
    }};
 
    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.ondragover = (evt) => { evt.preventDefault(); };
 
    // (B7) ON DROP - DO SOMETHING
    i.ondrop = (evt) => {
      evt.preventDefault();
      if (i != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it=0; it<items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (i == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
}



});


//update remaining items

function updateRemaining() {
  
  $('#itemsLeft').html($('.toDo').children().length);
  
}


