var time = 0;
var row = 1;
var radioLeft = false;
var radioRight = false;
var timer = null;
var minutes = 0;
var hours = 0;
var prevIndexTacticA = -1;
var prevIndexTacticB = -1;

var phaseArray = new Array();
var phaseTimeArray = new Array();

var tacticA = new Array(5+1).join('0').split('').map(parseFloat);
var tacticB = new Array(5+1).join('0').split('').map(parseFloat);

var idAnalizator;
var idPregovaracA;
var idPregovaracB;


function count() {
    time++;
    $('.timer').html(getTimeString(time));
}

function checker(left, getRow, getColumn) {
    
    if (row == getRow) {
        if(left) {
            radioLeft = true;
            tacticA[getColumn]++;
        }
        
        else {
            radioRight = true;
            tacticB[getColumn]++;
        }
        
        if (radioLeft && radioRight) {
            radioLeft = false;
            radioRight = false;
            row++;
            
            var radioButtonRow = '<tr class="radioButtons" id="row' + row + '">' +
                        '<td><input type="radio" name="row' + row + 'participant1" class="p1" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant1" class="p1" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant1" class="p1" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant1" class="p1" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant1" class="p1" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant2" class="p2" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant2" class="p2" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant2" class="p2" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant2" class="p2" id="' + row + '" /></td>' +
                        '<td><input type="radio" name="row' + row + 'participant2" class="p2" id="' + row + '" /></td>' +
                    '</tr>';
                    
            $('.radioButtons#row' + (row - 1)).after(radioButtonRow);
            $('.radioButtons#row' + row).hide();
            $('.radioButtons#row' + row).fadeIn(500);
        }
    }
    else {
        if(left) {
            tacticA[getColumn]++;
            tacticA[prevIndexTacticA]--;
        }
        
        else {
            tacticB[getColumn]++;
            tacticB[prevIndexTacticB]--;
        }
    }
}


function getTacticName(index) {
    if (index == 0)
        return 'напад';
    else if (index == 1)
        return 'избегнување';
    else if (index == 2)
        return 'информирање';
    else if (index == 3)
        return 'отварање';
    else
        return 'обединување';   
}

function getTimeString(time) {
    var hrs = Math.floor(time / 3600);
    var mins = Math.floor(time / 60);
    var sec = time % 60;
    var asdf = "";
    
    if (hrs != 0) {
        asdf = hrs + " часа";
    }
    if (mins != 0) {
        asdf += " " + mins + " минути";
    }
    if (sec != 0) {
        asdf += " " + sec + " секунди";
    }
    return asdf;
}

function getPositiveOrNegativeA() {
    if (((tacticA[3] + tacticA[4]) / tacticA.length) > (((tacticA[0] + tacticA[1]) / tacticA.length) + 0.4)) {
        return '<b>Преговарачот ' + idPregovaracA +'</b> има позитивен пристап во преговорите.';
    }
    
    else if (((tacticA[3] + tacticA[4]) / tacticA.length) > (((tacticA[0] + tacticA[1]) / tacticA.length) + 0.2)
             && ((tacticA[3] + tacticA[4]) / tacticA.length) <= (((tacticA[0] + tacticA[1]) / tacticA.length) + 0.4)) {
        return '<b>Преговарачот ' + idPregovaracA +'</b> има воглавно позитивен пристап во преговорите.';
    }
    
    else if (((tacticA[3] + tacticA[4]) / tacticA.length) > (((tacticA[0] + tacticA[1]) / tacticA.length))
             && ((tacticA[3] + tacticA[4]) / tacticA.length) <= (((tacticA[0] + tacticA[1]) / tacticA.length) + 0.2)) {
        return '<b>Преговарачот ' + idPregovaracA +'</b> има благ позитивен пристап во преговорите.';
    }
    
    else if (((tacticA[3] + tacticA[4]) / tacticA.length) < (((tacticA[0] + tacticA[1]) / tacticA.length))
             && ((tacticA[3] + tacticA[4]) / tacticA.length) >= (((tacticA[0] + tacticA[1]) / tacticA.length) + 0.2)) {
        return '<b>Преговарачот ' + idPregovaracA +'</b> има благ негативен пристап во преговорите.';
    }
    
    else if (((tacticA[3] + tacticA[4]) / tacticA.length) < (((tacticA[0] + tacticA[1]) / tacticA.length) + 0.2)
             && ((tacticA[3] + tacticA[4]) / tacticA.length) >= (((tacticA[0] + tacticA[1]) / tacticA.length) + 0.4)) {
        return '<b>Преговарачот ' + idPregovaracA +'</b> има воглавно негативен пристап во преговорите.';
    }
    
    else {
        return '<b>Преговарачот ' + idPregovaracA +'</b> има негативен пристап во преговорите.';
    }
}

function getPositiveOrNegativeB() {
    if (((tacticB[3] + tacticB[4]) / tacticB.length) > (((tacticB[0] + tacticB[1]) / tacticB.length) + 0.4)) {
        return '<b>Преговарачот ' + idPregovaracB +'</b> има позитивен пристап во преговорите.';
    }
    
    else if (((tacticB[3] + tacticB[4]) / tacticB.length) > (((tacticB[0] + tacticB[1]) / tacticB.length) + 0.2)
             && ((tacticB[3] + tacticB[4]) / tacticB.length) <= (((tacticB[0] + tacticB[1]) / tacticB.length) + 0.4)) {
        return '<b>Преговарачот ' + idPregovaracB +'</b> има воглавно позитивен пристап во преговорите.';
    }
    
    else if (((tacticB[3] + tacticB[4]) / tacticB.length) > (((tacticB[0] + tacticB[1]) / tacticB.length))
             && ((tacticB[3] + tacticB[4]) / tacticB.length) <= (((tacticB[0] + tacticB[1]) / tacticB.length) + 0.2)) {
        return '<b>Преговарачот ' + idPregovaracB +'</b> има благ позитивен пристап во преговорите.';
    }
    
    else if (((tacticB[3] + tacticB[4]) / tacticB.length) < (((tacticB[0] + tacticB[1]) / tacticB.length))
             && ((tacticB[3] + tacticB[4]) / tacticB.length) >= (((tacticB[0] + tacticB[1]) / tacticB.length) + 0.2)) {
        return '<b>Преговарачот ' + idPregovaracB +'</b> има благ негативен пристап во преговорите.';
    }
    
    else if (((tacticB[3] + tacticB[4]) / tacticB.length) < (((tacticB[0] + tacticB[1]) / tacticB.length) + 0.2)
             && ((tacticB[3] + tacticB[4]) / tacticB.length) >= (((tacticB[0] + tacticB[1]) / tacticB.length) + 0.4)) {
        return '<b>Преговарачот ' + idPregovaracB +'</b> има воглавно негативен пристап во преговорите.';
    }
    
    else {
        return '<b>Преговарачот ' + idPregovaracB +'</b> има негативен пристап во преговорите.';
    }
}

$(document).ready(function() {
    
    $('.pochetok').click(function() {
       if (timer == null) {
            $('.wrapper').fadeIn(500);
            $('.fazi').fadeIn(1000);
            $('.pochetok').fadeOut(300);
            timer = window.setInterval('count()', 1000);
            idAnalizator = $('.txtImeV').val();
            idPregovaracA = $('.txtImeA').val();
            idPregovaracB = $('.txtImeB').val();
       }
       
    });
    
    $('body').on('click', '.fazi button', function() {
        phaseArray.push($(this).html());
        phaseTimeArray.push(time);
        $('.ent').html(phaseArray[phaseArray.length - 1]);
    });
    
    $('.process').on('click', '.radioButtons input.p1', function(event) {
        checker(true, event.target.id, $('.radioButtons input.p1').index($(this)) % 5);
        prevIndexTacticA = $('.radioButtons input.p1').index($(this)) % 5;
    });
    
    $('.process').on('click', '.radioButtons input.p2', function(event) {
        checker(false, event.target.id, $('.radioButtons input.p2').index($(this)) % 5);  
        prevIndexTacticB = $('.radioButtons input.p2').index($(this)) % 5;
    });
    
    $('.process').on('click', '.finish', function(event) {
        $('.izvestaj').hide();
        
        $('.izvestaj').append("Предмет на преговорите било „" + $('.txtPredmet').val() + "“. Средба - " + $('.txtSredba').val() + ", број " +
                            $('.txtBroj').val() + " на " + $('.txtVreme').val() + " во " + $('.txtMesto').val() + ". Фази: " +
                            $('.txtFazi').val() + ". Во преговорите учествувале " + idPregovaracA + " и " + idPregovaracB +
                            ". Анализатор на преговорите бил " + idAnalizator + ". Преговорите траеле " + getTimeString(time) + ".");
        
         $('.izvestaj').append("<br>");
        
        for(i=0; i<phaseArray.length; i++) {
            if (i == phaseArray.length - 1) {
                $('.izvestaj').append("<br>Фазата " + phaseArray[i] + " започнува во " + getTimeString(phaseTimeArray[i]));
            }
            else
                $('.izvestaj').append("<br>Фазата " + phaseArray[i] + " започнува во " + getTimeString(phaseTimeArray[i]) + " и трае "+ getTimeString(phaseTimeArray[i+1] - phaseTimeArray[i]) +".");
        }
        
        $('.izvestaj').append("<br><br><b>Преговарачот " + idPregovaracA + "</b> ја искористил стратегијата ");
        
        for (i=0; i<tacticA.length; i++) {
            if (i == tacticA.length - 1 ) {
                $('.izvestaj').append(" и " + getTacticName(i) + " " + tacticA[i] + " пати.");
            }
            else if (i == tacticA.length - 2) {
                $('.izvestaj').append(getTacticName(i) + " " + tacticA[i] + " пати ");
            }
            else {
                $('.izvestaj').append(getTacticName(i) + " " + tacticA[i] + " пати, ");
            }
        }
        
        $('.izvestaj').append(" " + getPositiveOrNegativeA());
        
        $('.izvestaj').append("<br><br><b>Преговарачот " + idPregovaracB + "</b> ја искористил стратегијата ");
        for (i=0; i<tacticB.length; i++) {
            if (i == tacticB.length - 1 ) {
                $('.izvestaj').append(" и " + getTacticName(i) + " " + tacticB[i] + " пати.");
            }
            else if (i == tacticB.length - 2) {
                $('.izvestaj').append(getTacticName(i) + " " + tacticB[i] + " пати ");
            }
            else {
                $('.izvestaj').append(getTacticName(i) + " " + tacticB[i] + " пати, ");
            }
        }
        
        $('.izvestaj').append(" " + getPositiveOrNegativeB());
        
         $('form').fadeOut(500, function(){
            $('.izvestaj').fadeIn(1000);
         });

    });
});