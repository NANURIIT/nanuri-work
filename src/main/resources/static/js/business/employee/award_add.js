/** award_add **/
'use strict';

/** onload **/
$(function(){

    // 저장 클릭
    $(document).on('click', '#save', function(){
        let params = {
            przNm : $('#przNm').val(), 
            przDt : $('#przDt').val(), 
            przOrgNm : $('#przOrgNm').val(), 
            etcNm : $('#etcNm').val()
        };

        registerAward(params);
    });

});

var registerAward = function(params){
    if(isEmpty(params.przNm)){
        openPopup({
            title: '실패',
            text: '포상명을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#przNm').focus();
                });
            }
        });
    } else if(dateValidation(params.przDt) == false){
        openPopup({
            title: '실패',
            text: '포상일자를 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#przDt').focus();
                });
            }
        });
    } else if(isEmpty(params.przOrgNm)){
        openPopup({
            title: '실패',
            text: '포상기관을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#przOrgNm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST', 
            url : '/employee/awardWrite', 
            data : params, 
            success: openPopup({
                title: '성공',
                text: '대내외 수상경력 등록에 성공했습니다.',
                type: 'success',
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
 * @return {boolean} 유효성 검사 결과
 */
 var dateValidation = function (date) {
    if (isEmpty(date)) {
        return false;
    } else if (isNaN(date)) {
        return false;
    } else if (date.length > 8) {
        return false;
    } else if (date < 0) {
        return false;
    } else if (date.substring(4, 6) < 0 || date.substring(4, 6) > 12) {
        return false;
    } else if (date.substring(6, 8) < 0 || date.substring(6, 8) > 31) {
        return false;
    }
}