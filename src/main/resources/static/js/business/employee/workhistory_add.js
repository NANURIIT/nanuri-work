/** workhistory_add **/
'use strict';

/** onload **/
$(function(){

    $(document).on('click', '#save', function(){
        let params = {
            wrkplNm : $('#wrkplNm').val(), 
            encoYm : $('#encoYm').val(),
            rtrmYm : $('#rtrmYm').val(), 
            dtyNm : $('#dtyNm').val(), 
            chrgBsnNm : $('#chrgBsnNm').val()
        }

        registerWorkhistory(params);
    });

});

var registerWorkhistory = function(params){
    if(isEmpty(params.wrkplNm)){
        openPopup({
            title: '실패',
            text: '근무처를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#wrkplNm').focus();
                });
            }
        });
    } else if(dateValidation(params.encoYm) == false){
        openPopup({
            title: '실패',
            text: '입사년월을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#encoYm').focus();
                });
            }
        });
    } else if(dateValidation(params.rtrmYm) == false){
        openPopup({
            title: '실패',
            text: '퇴사년월을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#rtrmYm').focus();
                });
            }
        });
    } else if(isEmpty(params.dtyNm)){
        openPopup({
            title: '실패',
            text: '직책을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#dtyNm').focus();
                });
            }
        });
    } else if(isEmpty(params.chrgBsnNm)){
        openPopup({
            title: '실패',
            text: '담당업무를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#chrgBsnNm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST', 
            url : '/employee/workhistoryWrite', 
            data : params, 
            success : openPopup({
                title : '성공', 
                text : '회사소속이력 등록에 성공했습니다.', 
                type : 'success', 
                callback: function () {
                    location.href = '/employee/index';
                }
            })
        });
    }
}

/**
 * 날짜 유효성 검사
 * @param {string} date 날짜
 * @returns {boolean} 유효성 검사 결과
 */
 var dateValidation = function (date) {
    if (isEmpty(date)) {
        return false;
    } else if (isNaN(date)) {
        return false;
    } else if (date.length > 6) {
        return false;
    } else if (date < 0) {
        return false;
    } else if (date.substring(4, date.length) < 0 || date.substring(4, date.length) > 12) {
        return false;
    }
}