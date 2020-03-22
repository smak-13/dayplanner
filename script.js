
const dayText = $("#currentDay");
const timeBlocks = $(".time-block");
const storedVals = [];

function init(){
    dayText.text(moment().format('dddd, MMMM Do YYYY'));
    setBlockBgColor();
    loadSaved();
}

function setBlockBgColor(){
    $.each(timeBlocks, function(index, value){
        let bgClass = "";
        $(value).find("textarea").removeClass("past present future");
        if($(value).attr('data-hour') < moment().format('HH')){
            bgClass="past";
        }else if ($(value).attr('data-hour') > moment().format('HH')){
            bgClass="future";
        }else if ($(value).attr('data-hour') == moment().format('HH')){
            bgClass="present";
        }        
        $(value).find("textarea").addClass(bgClass);
    });
}
function loadSaved(){
    $.each(timeBlocks, function(index, value){
        $(value).find("textarea").val(localStorage.getItem($(value).attr('data-hour')))
    });
}
$('.saveBtn').on('click',function() {
    localStorage.setItem(
        $(this).parent().attr('data-hour')
        ,$(this).parent().find('textarea').val());
});

var refreshBlockBGColors = setInterval(function(){
    setBlockBgColor();
},30000);

init();


