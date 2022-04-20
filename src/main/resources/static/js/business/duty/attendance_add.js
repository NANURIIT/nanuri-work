/** attendance_add **/
'use strict';

/** onload **/
$(function(){
    getCommonCode();

    let date = new Date();
    let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate();
    let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
    
    $('#stDt').val(today);
    $('#edDt').val(today);
    $('#stTm').val(time);
    $('#edTm').val(time);

    console.log('1', today + ' ' + time);

    $(document).on('click', '#attendance', function(){
        let date = new Date();
        let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate();
        let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());

        let params = {
            svceFormCd : $('#dutyTypeList').val(), 
            svcePrjtTxt : $('#svcePrjtTxt').val(), 
            stDt : $('#stDt').val(), 
            stTm : $('#stTm').val(), 
            aawBtnClkDtm : today + ' ' + time
        };

        registerDuty(params);
    });

    $(document).on('click', '#leaveWork', function(){
        let date = new Date();
        let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate();
        let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());

        console.log('3', today + ' ' + time);
    });
});

var getCommonCode = function(){
    ajaxCall({
        method : 'GET', 
        url : '/employee/getCommonCode', 
        data : { dsCd : 'DUTY'}, 
        success : function(object){
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#dutyTypeList').html(COMMON_CODE_HTML);
        }
    });
}

var registerDuty = function(params){
    console.log(params);
}